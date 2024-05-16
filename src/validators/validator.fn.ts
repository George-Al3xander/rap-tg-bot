import { CTXFunc } from "@/types/type"

export function validationWrapper(validationFn?: CTXFunc | CTXFunc[]) {
    return function (...fns: CTXFunc[]) {
      if (!validationFn) {
        return fns
      }
      if (Array.isArray(validationFn)) {
        return [...validationFn, ...fns]
      }
      return [validationFn, ...fns]
    }
  }