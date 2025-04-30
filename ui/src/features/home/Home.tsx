import "./Home.css"
import { useState } from "react"
//REACT HOOK FORM reduces re-rendering drastically
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { loginSubmit, submit, } from "./homeSlice"
import { Credentials } from "../../types/credentials"
import { redirect, useNavigate } from "react-router";

export const Home = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      userName: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    await dispatch(loginSubmit(data))
    navigate("/movieList");
  }

  return (
    <form className="grid-container" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="userName">UserName</label>
      <input id="userName" {...register("userName")} defaultValue="test" />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        {...register("password", { required: true, maxLength: 10 })}
      />
      {errors.password && <p className="error">This field is required</p>}

      <button type="submit">Submit</button>
    </form>
  )
}