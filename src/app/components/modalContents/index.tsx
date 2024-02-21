import GeneralDetails from "./GeneralDetails"
import Ticket from "./Ticket";
import TriggerFirstModal from "./TriggerFirstModal";
import MetadataEdit from "./MetadataEdit";

const ModalCustomBody = ({ step }: { step: number }) => {
    switch (step) {
        case 0: return <GeneralDetails />;
        case 1: return <TriggerFirstModal />;
        case 2: return <MetadataEdit />
        case 3: return <Ticket />;
    }
}

export default ModalCustomBody