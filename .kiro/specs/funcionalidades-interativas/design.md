# Design Document - Funcionalidades Interativas

## Overview

Este documento descreve o design técnico para implementar funcionalidades interativas no Detailing Prime. O sistema será construído usando React hooks, EmailJS para envio de emails, Fuse.js para busca, e localStorage para persistência. Todas as funcionalidades serão client-side para manter compatibilidade com static export do Next.js.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│  (Formulários, Busca, Notificações, Loading States)        │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   React Components Layer                     │
│  - NewsletterForm    - ContactForm    - SearchBar          │
│  - Toast             - LoadingSpinner - ValidationMessages  │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    Custom Hooks Layer                        │
│  - useForm          - useToast        - useSearch           │
│  - useLocalStorage  - useEmailJS     - useValidation       │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    Services Layer                            │
│  - EmailJS Service  - Fuse.js Search  - LocalStorage API   │
└─────────────────────────────────────────────────────────────┘
```

### Component Structure

```
src/
├── components/
│   ├── forms/
│   │   ├── NewsletterForm.tsx       (Newsletter component)
│   │   ├── ContactForm.tsx          (Contact form component)
│   │   └── SearchBar.tsx            (Search component)
│   ├── ui/
│   │   ├── Toast.tsx                (Toast notification)
│   │   ├── LoadingSpinner.tsx       (Loading indicator)
│   │   └── ValidationMessage.tsx    (Error messages)
│   └── NewsletterCTA.tsx            (Updated with form)
├── hooks/
│   ├── useForm.ts                   (Form state management)
│   ├── useToast.ts                  (Toast notifications)
│   ├── useSearch.ts                 (Search functionality)
│   ├── useLocalStorage.ts           (Persistent storage)
│   ├── useEmailJS.ts                (EmailJS integration)
│   └── useValidation.ts             (Form validation)
├── lib/
│   ├── emailjs.ts                   (EmailJS config)
│   ├── search.ts                    (Fuse.js config)
│   └── validation.ts                (Validation rules)
└── types/
    └── forms.ts                     (TypeScript interfaces)
```

## Components and Interfaces

### 1. NewsletterForm Component

**Purpose:** Capturar emails para newsletter

**Props:**
```typescript
interface NewsletterFormProps {
  variant?: 'inline' | 'modal' | 'cta';
  onSuccess?: () => void;
  className?: string;
}
```

**State:**
```typescript
interface NewsletterFormState {
  email: string;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}
```

**Behavior:**
- Validação de email em tempo real
- Loading state durante envio
- Toast de sucesso/erro
- Limpa formulário após sucesso
- Salva tentativa no localStorage (evitar spam)

---

### 2. ContactForm Component

**Purpose:** Formulário de contato funcional

**Props:**
```typescript
interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}
```

**State:**
```typescript
interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  isLoading: boolean;
  errors: Record<string, string>;
  isSuccess: boolean;
}
```

**Behavior:**
- Validação em blur e submit
- Persistência no localStorage
- Loading state com botão desabilitado
- Toast de sucesso/erro
- Limpa formulário e localStorage após sucesso

---

### 3. SearchBar Component

**Purpose:** Busca de artigos em tempo real

**Props:**
```typescript
interface SearchBarProps {
  articles: Article[];
  onResultClick?: (article: Article) => void;
  placeholder?: string;
  className?: string;
}
```

**State:**
```typescript
interface SearchBarState {
  query: string;
  results: Article[];
  isOpen: boolean;
  selectedIndex: number;
}
```

**Behavior:**
- Busca fuzzy com Fuse.js
- Debounce de 300ms
- Navegação por teclado (↑↓ Enter Esc)
- Highlight de termos encontrados
- Fecha ao clicar fora

---

### 4. Toast Component

**Purpose:** Notificações não-intrusivas

**Props:**
```typescript
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: () => void;
}
```

**Behavior:**
- Animação de entrada/saída
- Auto-close após duração
- Empilhamento de múltiplos toasts
- Ícones por tipo
- Cores semânticas

---

### 5. LoadingSpinner Component

**Purpose:** Indicador de loading

**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}
```

**Variants:**
- Inline (dentro de botões)
- Overlay (tela cheia)
- Skeleton (placeholder de conteúdo)

## Data Models

### Form Data Types

```typescript
// Newsletter
interface NewsletterData {
  email: string;
  timestamp: number;
  source: string; // 'homepage' | 'article' | 'modal'
}

// Contact
interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
}

// Search Result
interface SearchResult {
  article: Article;
  score: number;
  matches: Array<{
    key: string;
    value: string;
    indices: [number, number][];
  }>;
}

// Toast
interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number;
  timestamp: number;
}

// Validation Error
interface ValidationError {
  field: string;
  message: string;
  type: 'required' | 'format' | 'length' | 'custom';
}
```

### LocalStorage Schema

```typescript
// Newsletter attempts (prevent spam)
interface NewsletterAttempts {
  [email: string]: {
    count: number;
    lastAttempt: number;
    isSubscribed: boolean;
  };
}

// Contact form draft
interface ContactFormDraft {
  data: ContactData;
  savedAt: number;
  expiresAt: number;
}

// Search history
interface SearchHistory {
  queries: Array<{
    query: string;
    timestamp: number;
    resultCount: number;
  }>;
  maxSize: 10;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Email validation consistency
*For any* email string, the validation function should return true if and only if the email matches the RFC 5322 standard format
**Validates: Requirements 1.1, 2.2**

### Property 2: Form state persistence round-trip
*For any* valid form data, saving to localStorage then loading should produce equivalent data
**Validates: Requirements 6.1, 6.2**

### Property 3: Search result relevance ordering
*For any* search query and article list, results should be ordered by descending relevance score
**Validates: Requirements 3.2**

### Property 4: Toast auto-dismiss timing
*For any* toast with duration D, the toast should be removed after exactly D milliseconds (±100ms tolerance)
**Validates: Requirements 9.5**

### Property 5: Loading state consistency
*For any* async operation, isLoading should be true during execution and false after completion (success or error)
**Validates: Requirements 4.1, 4.2**

### Property 6: Validation error clearing
*For any* form field, when the field becomes valid, its error message should be removed
**Validates: Requirements 5.4**

### Property 7: LocalStorage expiration
*For any* stored data with expiration time T, the data should be discarded when current time > T
**Validates: Requirements 6.5**

### Property 8: Keyboard navigation order
*For any* form, pressing Tab should focus fields in the order they appear in the DOM
**Validates: Requirements 7.1**

### Property 9: Search debounce behavior
*For any* sequence of keystrokes within 300ms, only the last keystroke should trigger a search
**Validates: Requirements 3.1**

### Property 10: EmailJS retry logic
*For any* failed email send, the system should retry up to 3 times before showing error
**Validates: Requirements 10.3, 10.4**

## Error Handling

### Error Categories

1. **Validation Errors**
   - Display inline below field
   - Red border on invalid field
   - Clear on field correction
   - Prevent form submission

2. **Network Errors**
   - Retry logic (3 attempts)
   - Exponential backoff (1s, 2s, 4s)
   - Toast notification
   - Maintain form data

3. **Service Errors (EmailJS)**
   - Log to console
   - Toast with generic message
   - Suggest alternative contact method
   - Don't expose API keys

4. **Storage Errors (localStorage)**
   - Graceful degradation
   - Continue without persistence
   - Toast warning
   - Don't block functionality

### Error Messages

```typescript
const ERROR_MESSAGES = {
  // Validation
  REQUIRED: 'Este campo é obrigatório',
  INVALID_EMAIL: 'Email inválido',
  MESSAGE_TOO_SHORT: 'Mensagem deve ter no mínimo 10 caracteres',
  
  // Network
  NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
  TIMEOUT: 'Tempo esgotado. Verifique sua conexão.',
  
  // Service
  EMAIL_SEND_FAILED: 'Erro ao enviar email. Tente contato@detailingprime.com.br',
  ALREADY_SUBSCRIBED: 'Este email já está cadastrado',
  
  // Storage
  STORAGE_FULL: 'Armazenamento local cheio. Limpe o cache do navegador.',
  STORAGE_UNAVAILABLE: 'Armazenamento local indisponível',
};
```

## Testing Strategy

### Unit Tests

**Form Validation:**
- Test email regex with valid/invalid emails
- Test required field validation
- Test message length validation
- Test error message display

**LocalStorage:**
- Test save/load cycle
- Test expiration logic
- Test data corruption handling
- Test quota exceeded

**Search:**
- Test Fuse.js configuration
- Test result ordering
- Test empty query handling
- Test special characters

### Property-Based Tests

**Library:** fast-check (JavaScript property testing)

**Configuration:**
```typescript
import fc from 'fast-check';

// Run 100 iterations per property
const testConfig = { numRuns: 100 };
```

**Property Tests:**

1. **Email Validation Property**
```typescript
// Feature: funcionalidades-interativas, Property 1: Email validation consistency
fc.assert(
  fc.property(fc.emailAddress(), (email) => {
    const isValid = validateEmail(email);
    return isValid === /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }),
  testConfig
);
```

2. **LocalStorage Round-Trip Property**
```typescript
// Feature: funcionalidades-interativas, Property 2: Form state persistence round-trip
fc.assert(
  fc.property(
    fc.record({
      name: fc.string(),
      email: fc.emailAddress(),
      message: fc.string(),
    }),
    (formData) => {
      saveToLocalStorage('contact-form', formData);
      const loaded = loadFromLocalStorage('contact-form');
      return JSON.stringify(loaded) === JSON.stringify(formData);
    }
  ),
  testConfig
);
```

3. **Search Ordering Property**
```typescript
// Feature: funcionalidades-interativas, Property 3: Search result relevance ordering
fc.assert(
  fc.property(
    fc.string(),
    fc.array(fc.record({ title: fc.string(), content: fc.string() })),
    (query, articles) => {
      const results = searchArticles(query, articles);
      // Check if results are ordered by score descending
      for (let i = 0; i < results.length - 1; i++) {
        if (results[i].score < results[i + 1].score) return false;
      }
      return true;
    }
  ),
  testConfig
);
```

4. **Loading State Property**
```typescript
// Feature: funcionalidades-interativas, Property 5: Loading state consistency
fc.assert(
  fc.property(fc.boolean(), async (shouldSucceed) => {
    const { result } = renderHook(() => useEmailJS());
    
    const promise = result.current.sendEmail({});
    expect(result.current.isLoading).toBe(true);
    
    await promise;
    expect(result.current.isLoading).toBe(false);
    return true;
  }),
  testConfig
);
```

### Integration Tests

**EmailJS Integration:**
- Test successful email send
- Test network failure handling
- Test retry logic
- Test rate limiting

**Search Integration:**
- Test with real article data
- Test performance with 100+ articles
- Test special characters in queries
- Test empty results

**Form Submission Flow:**
- Test complete newsletter flow
- Test complete contact flow
- Test validation → submission → success
- Test validation → submission → error

## Implementation Notes

### EmailJS Setup

1. Create account at emailjs.com
2. Create email service (Gmail/Outlook)
3. Create email templates
4. Get Service ID, Template ID, Public Key
5. Store in environment variables

**Environment Variables:**
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT=template_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_NEWSLETTER=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
```

### Fuse.js Configuration

```typescript
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.2 },
    { name: 'tags', weight: 0.1 },
  ],
  threshold: 0.3, // 0 = exact match, 1 = match anything
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};
```

### Accessibility Requirements

**ARIA Labels:**
- All form fields must have aria-label or associated label
- Loading states must have aria-live="polite"
- Error messages must have role="alert"
- Search results must have role="listbox"

**Keyboard Navigation:**
- Tab order must be logical
- Enter submits forms
- Escape closes modals/dropdowns
- Arrow keys navigate search results

**Screen Reader Announcements:**
- Form submission success/error
- Loading states
- Validation errors
- Search result count

### Performance Considerations

**Debouncing:**
- Search: 300ms debounce
- Form validation: 500ms debounce on blur
- LocalStorage saves: 1000ms debounce

**Memoization:**
- Memoize search results
- Memoize validation functions
- Memoize Fuse.js instance

**Lazy Loading:**
- Load EmailJS only when needed
- Load Fuse.js only on search pages
- Defer non-critical scripts

## Security Considerations

1. **Email Validation:**
   - Sanitize email inputs
   - Prevent email injection
   - Rate limit submissions

2. **XSS Prevention:**
   - Sanitize all user inputs
   - Use React's built-in escaping
   - Don't use dangerouslySetInnerHTML with user data

3. **API Keys:**
   - Use NEXT_PUBLIC_ prefix for client-side keys
   - Never expose private keys
   - Rotate keys periodically

4. **Rate Limiting:**
   - Max 3 newsletter attempts per email per day
   - Max 5 contact form submissions per IP per hour
   - Store in localStorage (client-side only)

## Dependencies

```json
{
  "dependencies": {
    "@emailjs/browser": "^4.3.3",
    "fuse.js": "^7.0.0",
    "react-hot-toast": "^2.4.1"
  },
  "devDependencies": {
    "fast-check": "^3.15.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1"
  }
}
```

## Deployment Checklist

- [ ] EmailJS account created and configured
- [ ] Environment variables set in Cloudflare Pages
- [ ] Email templates created and tested
- [ ] Rate limiting tested
- [ ] Accessibility audit passed
- [ ] Performance metrics acceptable (< 100ms response)
- [ ] Error handling tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing completed
- [ ] Analytics events configured
