import { Dispatch, SetStateAction, useCallback, useState } from "react"

// TS 매개변수는 추론을 잘 못한다... 확실히 붙여줘야 함.
// TS가 인라인 콜백 함수는 매개변수를 추론해줍니다.
// generic 선언을 하여 에러 방지, 매개변수와 리턴값의 타입을 정해준다.
// generic의 장점 매개변수와 리턴값의 타입을 자동으로 정해줄 수 있다.

type ReturnTypes<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>]

// TS를 사용하면 가독성이 심각하게 떨어진다... 그나마 Return type을 정해서 분리시킬 수 있음
// 편리함과 가독성이 똥망인 대신 안정성이 늘어난다.
const useInput = <T = any>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData)
  const handler = useCallback((e: any) => {
    setValue(e.target.value)
  }, [])
  return [value, handler, setValue] // [T, (e: any) => void, Dispatch<SetStateAction<T>>]
}

export default useInput

// e: any 대신 ChangeEvent<HTMLInputElement>
// e.target.value 대신 e.target.value as unknown as T