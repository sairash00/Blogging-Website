import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { CiImageOn } from "react-icons/ci";

export default function Update({ open, setOpen }) {
  function close() {
    setOpen(false); // Set open to false to close the dialog
  }

  return (
    <Dialog open={open} onClose={close} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#212121] bg-opacity-80 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-[#051937] text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">

                <div className='w-full border-b border-[#294166] min-h-[20vh] py-2 flex items-center justify-center' >
                  <form className='flex flex-col gap-3 ' enctype="multipart/form-data"  >

                      <div className='w-full h-[10vh] flex items-center justify-center border border-[#294166] rounded-md ' >
                          <label className='text-sm hover:underline underline-offset-4 text-[#9ca3af] ' htmlFor="file">Click to upload Profile.</label>
                          <input type="file" id='file' className='sr-only' />
                      </div>

                      <div>
                           <label htmlFor="instagram" className='text-sm text-[#c3c3c3] ' >Instagram</label>
                           <input type="text" id='instagram' placeholder='Link to your Instagram' className='w-full px-2 py-2 bg-transparent outline-none rounded-md border-[#224271] border ' />
                      </div>
            
                      <div>
                           <label htmlFor="facebook" className='text-sm text-[#c3c3c3] ' >Facebook</label>
                           <input type="text" id='facebook' placeholder='Link to your Facebook' className='w-full px-2 py-2 bg-transparent outline-none rounded-md border-[#224271] border ' />
                      </div>

                      <div>
                           <label htmlFor="x" className='text-sm text-[#c3c3c3] ' >X (twitter)</label>
                           <input type="text" id='x' placeholder='Link to your X' className='w-full px-2 py-2 bg-transparent outline-none rounded-md border-[#224271] border ' />
                      </div>
            
                  </form>
                </div>

            <div className="bg-[#051937]  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={close}
                className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
              >
                Upload
              </button>
              <button
                type="button"
                data-autofocus
                onClick={close}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
