import { IonSpinner } from "@ionic/react";

const Waiting:React.FC=()=>{
    return (
        <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <IonSpinner name="circles"/>
        </div>
        </>
    );
}
export default Waiting;