import { Alert } from "react-bootstrap";
const ErrorComponent = ({err})=>{
    return(
        <Alert variant="danger" className="my-2 p-2">
            Error : {err} 
        </Alert>
    );
}

export default ErrorComponent;