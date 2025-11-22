// src/shared/errors/errorMapper.ts
type ErrorCode =
  | 'NETWORK_ERROR'
  | 'UNAUTHORIZED'
  | 'VALIDATION_ERROR'
  | 'INTERNAL_SERVER_ERROR'
  | 'UNKNOWN_ERROR'
  | 'INVALID_EMAIL_OR_PASSWORD'
  | 'INVALID_THEME'
  | 'ZOD_ERROR'

type ErrorMap = Record<ErrorCode, string>

const errorMessages: ErrorMap = {
  NETWORK_ERROR: 'Falha na conexão. Verifique sua internet',
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente',
  VALIDATION_ERROR: 'Os dados enviados estão incorretos',
  INTERNAL_SERVER_ERROR: 'Erro interno. Tente novamente mais tarde',
  INVALID_EMAIL_OR_PASSWORD: 'Erro ao tentar logar, verifique seu email/senha',
  UNKNOWN_ERROR: 'Algo deu errado. Tente novamente',
  INVALID_THEME: 'Tema invalido',
  ZOD_ERROR: ''
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapError(error: unknown): { code: ErrorCode; message: any } {
  // Tenta detectar o tipo do erro
  if (typeof error === 'object' && error !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any

    // Erros HTTP (axios, fetch, etc)
    if (err.response) {
      const status = err.response.status
      if (status === 401) return { code: 'UNAUTHORIZED', message: errorMessages.UNAUTHORIZED }
      if (status === 422) return { code: 'VALIDATION_ERROR', message: errorMessages.VALIDATION_ERROR }
      if (status >= 500) return { code: 'INTERNAL_SERVER_ERROR', message: errorMessages.INTERNAL_SERVER_ERROR }
    }

    if (err.code && err.code === 'ZOD_ERROR' as ErrorCode) {
      return {
        code: 'ZOD_ERROR',
        message: err.error
      }
    }

    if (err.code && errorMessages[err.code as ErrorCode]) {
      return { code: err.code as ErrorCode, message: errorMessages[err.code as ErrorCode] }
    }
  }

  return { code: 'UNKNOWN_ERROR', message: errorMessages.UNKNOWN_ERROR }
}
