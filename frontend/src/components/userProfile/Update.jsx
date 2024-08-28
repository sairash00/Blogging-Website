import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import axios from "axios";

export default function Update({ open, setOpen }) {
  function close() {
    setOpen(false); // Set open to false to close the dialog
  }

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState(null);
  const [disable, setDisable] = useState(false);

  const handleImage = (e) => {
    e.preventDefault();
    setImg(e.target.files[0]);
    setDisable(true);
  };

  const uploadAvatar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!img) {
        setLoading(false);
        return setMsg("Image is required");
      }
      const formData = new FormData();
      formData.append("avatar", img);
      const response = await axios.post(import.meta.env.VITE_AVATAR, formData);
      const data = response.data;
      console.log(data);
      setLoading(false);
      setImg(null);
      setDone(true);

      setTimeout(() => {
        setDone(false);
        setDisable(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setMsg(error.response?.data?.message || "An error occurred");
        console.log(error);
      } else {
        setMsg("Something went wrong");
      }
    }
  };

  const [links, setLinks] = useState({
    instagram: "",
    facebook: "",
    x: ""
  });

  const handleChange = (e) => {
    setLinks({
      ...links,
      [e.target.name]: e.target.value
    });
  };

  const addLink = async (e, platform, link) => {
    e.preventDefault();
    if (!link || !/^https?:\/\//.test(link) || link.length < 10) {
      return setMsg(`Invalid ${platform} link`);
    }
    try {
      const response = await axios.post(import.meta.env.VITE_ADDLINK, {
        platform,
        link
      });
      const data = response.data;
      setMsg(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMsg(error.response?.data?.message || "An error occurred");
      } else {
        setMsg("An unexpected error occurred");
      }
    }
  };

  const addFbLink = (e) => addLink(e, "facebook", links.facebook);
  const addInstaLink = (e) => addLink(e, "instagram", links.instagram);
  const addXLink = (e) => addLink(e, "x", links.x);

  return (
    <Dialog open={open} onClose={close} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#212121] bg-opacity-80 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-[#051937] text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="w-full border-b border-[#294166] min-h-[20vh] py-2 flex gap-4 flex-col px-3">
              <form
                onSubmit={uploadAvatar}
                className="flex gap-3"
                encType="multipart/form-data"
              >
                <div className="w-full h-[10vh] flex items-center px-2 justify-between border border-[#294166] rounded-md">
                  <label
                    className="text-sm hover:underline underline-offset-4 text-[#9ca3af]"
                    htmlFor="file"
                  >
                    {img ? img.name : "Click me to select Image"}
                  </label>
                  <input type="file" required onChange={handleImage} accept="image/*" id="file" className="sr-only" />
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                  >
                    {loading ? <div className="w-5 h-5 border-b-2 rounded-full animate-spin"></div> : done ? "Done" : "Update"}
                  </button>
                </div>
              </form>

              <form onSubmit={addInstaLink} className="">
                <div className="flex">
                  <input
                    type="text"
                    name="instagram"
                    id="instagram"
                    value={links.instagram}
                    onChange={handleChange}
                    placeholder="Link to your Instagram"
                    className="w-full px-2 py-2 bg-transparent outline-none rounded-md border-[#224271] border"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                  >
                    Upload
                  </button>
                </div>
              </form>

              <form onSubmit={addFbLink} className="">
                <div className="flex">
                  <input
                    type="text"
                    id="facebook"
                    name="facebook"
                    onChange={handleChange}
                    value={links.facebook}
                    placeholder={msg ? msg : "Link to your Facebook"}
                    className="w-full px-2 py-2 bg-transparent outline-none rounded-md border-[#224271] border"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                  >
                    Upload
                  </button>
                </div>
              </form>

              <form onSubmit={addXLink} className="">
                <div className="flex">
                  <input
                    type="text"
                    name="x"
                    value={links.x}
                    onChange={handleChange}
                    id="x"
                    placeholder="Link to your X"
                    className="w-full px-2 py-2 bg-transparent outline-none rounded-md border-[#224271] border"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                  >
                    Upload
                  </button>
                </div>
              </form>
              <div className="text-sm text-gray-400 font-semibold">
                {msg}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
