import Create from './components/create'
import Records from './components/records'
import { takeoffRecords } from './data'
const TakeOff = () => {
    return (
        <>
            {
                takeoffRecords.length > 0 ?
                    <Records /> : <Create />
            }
        </>
    )
}

export default TakeOff