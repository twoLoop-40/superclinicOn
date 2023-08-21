import { Alert } from "./ui/alert";

type ShowErrorProps = {
  message?: string;
};

// 에러 메세지를 받아서 보여주는 컴포넌트
const ShowError = ({ message }: ShowErrorProps) => {
  return !message ? null : <Alert className='bg-orange-400'>{message}</Alert>;
};

export default ShowError;
