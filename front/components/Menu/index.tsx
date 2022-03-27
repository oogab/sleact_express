import React, { CSSProperties, FC, useCallback } from "react";
import { CloseModalButton, CreateMenu } from "./styles";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  style: CSSProperties;
  closeButton?: boolean;
}

// props 넣으면 아래처럼 빨간줄이 뜨는데
// TS에서는 props들의 type을 interface로 작성해줘야 한다!
const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton }) => {
  // stopPropagation을 설정하면 부모 태그로 이벤트 버블링 발생을 막는다.
  // 이벤트 버블링이 발생하면 div에서 메뉴 태그를 눌렀을 때 그 위 태그의 onClick도 발생. 이를 막아야 한다.
  const stopPropagation = useCallback((e) => {
    e.stopPropagation()
  }, [])

  return (
    <CreateMenu onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>menu</div>
      {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
      {children}
    </CreateMenu>
  )
}

// props들의 기본 값 설정을 위해서는 defaultProps 작성!
Menu.defaultProps = {
  closeButton: true
}

export default Menu