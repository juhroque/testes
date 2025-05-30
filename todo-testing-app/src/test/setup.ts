import '@testing-library/jest-dom';
import { expect, test, describe, it, vi, beforeEach, afterEach } from 'vitest';

// Torna as funções de teste disponíveis globalmente
Object.assign(global, { expect, test, describe, it, vi, beforeEach, afterEach }); 