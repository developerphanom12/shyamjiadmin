import React from 'react'
import { FaDownload } from 'react-icons/fa'

const Prospectus = () => {
  return (
    <div className='border border-gray-300 '>
        <div className=" px-6 py-2 grid grid-cols-2 items-center ">
          <h3 className="font-semibold text-black text-lg ">
            Prospectus
          </h3>
           <div className="px-6  flex justify-center">
                <a
                    // href={report.file}
                    className="bg-[#F7BF57] hover:bg-[#E6A84A] text-black px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                    download
                >
                    Download <FaDownload className="text-xs" />
                </a>
           </div>
        </div>
    </div>
  )
}

export default Prospectus
