import { useState } from "react"
//REACT HOOK FORM reduces re-rendering drastically
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Credentials } from "../../types/credentials"
import { redirect, useNavigate } from "react-router";
import { selectUserName, } from "../home/homeSlice"

/*
interface IFormInput {
  userName: string
  password: string
}
*/

export const MovieList = () => {
  const dispatch = useAppDispatch()
  const userName = useAppSelector(selectUserName)

  

  return (
    
<div>Hi {userName}</div>
  )
}
