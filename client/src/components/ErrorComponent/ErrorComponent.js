import { Alert } from "react-bootstrap";
const ErrorComponent = ({err})=>{
    return(
        <Alert variant="danger">
            Error : {err} 
        </Alert>
    );
}

export default ErrorComponent;