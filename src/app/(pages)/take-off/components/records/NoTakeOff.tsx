import { bg_style } from '@/globals/tailwindvariables'
import React from 'react'

const NoTakeOff = () => {
  return (
    <div className={`${bg_style} p-5 h-[75vh] flex items-center justify-center`}>
      {/* <div className="flex justify-between items-center mb-3">
        <TertiaryHeading title="No Records Measurements" />
        <Button
          text="Start Measurements"
          className="!w-auto"
          icon="plus.svg"
          iconwidth={20}
          iconheight={20}
          onClick={() => router.push('/takeoff/upload')}
        />
      </div>
      <Table handleEditClick={handleEditClick} /> */}
      {/* <Pagination /> */}
      <div className='h-[70%] w-[40%] border flex justify-center flex-col items-center'>
        <div className='h-[50%] flex justify-end'>ICON</div>
        <div className='h-[50%] flex flex-col items-center'>
            <div>No Takeoff Record</div>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, eveniet. Iste earum necessitatibus quibusdam minima alias sapiente, modi nostrum temporibus eum consequatur harum. Repellendus iusto tenetur facere ratione sapiente repellat?
            </div>
            <div>
                <button>Create your takeoff</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NoTakeOff