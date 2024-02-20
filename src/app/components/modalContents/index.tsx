import GeneralDetails from "./GeneralDetails"
import Ticket from "./Ticket";
import TriggerFirstModal from "./TriggerFirstModal";
import TriggerSecondModal from "./TriggerSecondModal";
import MetadataEdit from "./MetadataEdit";

const ModalCustomBody = ({step}:{step:number}) => {
    console.log("step=>", step)
    switch (step)
    {
        case 0: return <GeneralDetails />;
        case 1: return <TriggerFirstModal />;
        case 2: return <TriggerSecondModal />;
        case 3: return <MetadataEdit />
        case 4: return <Ticket />;
    }
}

export default ModalCustomBody