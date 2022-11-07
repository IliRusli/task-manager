import styled from "styled-components";

const ContainerStyles = styled.div`
  display: flex;
  align-items: start;
  padding: 0.5rem;
  border: 2px solid gainsboro;
  background-color: ${(props) =>
    props.className === "error" ? "indianred" : "darkseagreen"};
`;

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const Notification = (props: NotificationProps) => {
  const { message, type } = props;
  if (message === null) {
    return null;
  }

  return <ContainerStyles className={type}>{message}</ContainerStyles>;
};

export default Notification;
