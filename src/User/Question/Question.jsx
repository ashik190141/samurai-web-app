import React from 'react';
import loggedInUser from '../../utils/loggedInUser';
import SendSharpIcon from "@mui/icons-material/SendSharp";
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import img from '../../assets/profile_img.png'

const Question = () => {
    const email = loggedInUser();
    const handleGiveFeedback = (event) => {
      event.preventDefault();

      const form = event.target;
      const feedback = form.feedback.value;

      const giveFeedback = {
        feedback: feedback,
        email: email,
        comment: []
      };

      fetch(`http://localhost:5000/app/feedback`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(giveFeedback),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            Swal.fire({
              title: "Successfully Generate Your Question",
              confirmButtonText: "Ok",
            })
              form.reset();
              refetch();
            // setBlogs(blogs);
          }
        });
    };

    const handleGiveComment = (event) => {
      event.preventDefault();

      const form = event.target;
        const feedback = form.feedback.value;
        const id = form.questionID.value;
        console.log(id);

      const giveFeedback = {
        feedback: feedback,
        email: email,
        id:id
      };
        console.log(giveFeedback);

      fetch(`http://localhost:5000/app/comment`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(giveFeedback),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            Swal.fire({
              title: "Successfully Send Your Comment",
              confirmButtonText: "Ok",
            });
              form.reset();
              refetch();
            // setBlogs(blogs);
          }
        });
    };
    const { data: questions = [], refetch } = useQuery({
      queryKey: ["blogs"],
      queryFn: async () => {
        try {
          const res = await fetch(`http://localhost:5000/app/feedback`);

          if (!res.ok) {
            throw new Error(`Request failed with status: ${res.status}`);
          }

            const data = await res.json();
            console.log(data);
          return data;
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error; // Re-throw the error to let React Query handle it
        }
      },
    });
    return (
      <div>
        <div className="px-1">
          <h2 className="text-xl py-3">Send Your Question</h2>
          <form onSubmit={handleGiveFeedback} className="mt-3 feedback-section">
            <div className="">
              <div className="form-control w-full mb-3">
                <label>
                  <input
                    required
                    type="text"
                    name="feedback"
                    placeholder="Question"
                    className="input border-olive-lightgreen w-full bg-slate-100"
                  />
                </label>
              </div>
              <div className="w-full px-3 mb-3 flex justify-end">
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
        <div className="px-2">
          {questions?.map((question) => (
            <div key={question._id} className="py-2">
              <div className="flex gap-2 items-center">
                <img src={img} alt="" width="30px" />
                <p className="font-bold">{question.name}</p>
              </div>
              <div className="ml-10">{question.question}</div>
              <div className="pl-10">
                <form
                  onSubmit={handleGiveComment}
                  className="mt-3 feedback-section"
                >
                  <div className="flex">
                    <div className="form-control w-full mb-3">
                      <label>
                        <input
                          required
                          type="text"
                          name="feedback"
                          placeholder="Comment"
                          className="input border-olive-lightgreen w-full bg-slate-100"
                        />
                      </label>
                    </div>
                    <div className="form-control w-full mb-3 hidden">
                      <label>
                        <input
                          type="text"
                          name="questionID"
                          defaultValue={question?._id}
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
              <div className="ml-14">
                {question.comment.map((comment) => (
                  <div>
                    <div className="flex gap-2 items-center">
                      <img src={img} alt="" width="30px" />
                      <p className="font-bold">{comment.nameComment}</p>
                    </div>
                    <div className="ml-10">{comment.comment}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Question;