import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingRipple from "../../components/LoadingRipple/LoadingRipple";
import image from "../../Assets/question.svg";
import SingleQuestions from "./SingleQuestions";

const Blogs = () => {
  const { data: questions = [], isloading } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await fetch(
        "https://gobuysellphone-server.vercel.app/questions"
      );
      const data = await res.json();
      return data;
    },
  });

  if (isloading) {
    return <LoadingRipple></LoadingRipple>;
  }

  return (
    <div className=" container mx-auto grid lg:grid-cols-2">
      <div>
        <img src={image} alt="img" />
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        className="container mx-auto mt-20"
      >
        {questions.map((question) => (
          <SingleQuestions
            key={question._id}
            question={question}
          ></SingleQuestions>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
// {questions.map((question) => (
//   <SingleQuestions
//     key={question._id}
//     question={questions}
//   ></SingleQuestions>
// ))}
