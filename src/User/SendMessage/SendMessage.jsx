import React from 'react';
import { useParams } from 'react-router-dom';
import loggedInUser from '../../utils/loggedInUser';

const SendMessage = () => {
    const id = useParams();
    console.log(id);
    const handleMessage = (event) => {
        event.preventDefault();

        const form = event.target;
        const message = form.feedback.value;
        const sender = loggedInUser();
        const receiver = id
        
        const sendMessage = {
          message: message,
          sender: sender,
          receiver: receiver
        };
    }
    return (
      <div>
        <div className='absolute bottom-0'>
          <div className="px-1 ml-5">
            <form
            onClick={handleMessage}
              className="mt-3 feedback-section"
            >
              <div className="flex">
                <div className="form-control w-full mb-3">
                  <label>
                    <input
                      required
                      type="text"
                      name="feedback"
                      placeholder="Message"
                      className="input border-olive-lightgreen w-full bg-slate-100"
                    />
                  </label>
                </div>
                <div className="w-1/3 px-3 mb-3 flex justify-end">
                  <div className="text-end">
                    {/* <div>
                    <SendSharpIcon></SendSharpIcon>
                  </div> */}
                    <input
                      type="submit"
                      value="Send"
                      className="input border-olive-lightgreen w-full bg-slate-100"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default SendMessage;