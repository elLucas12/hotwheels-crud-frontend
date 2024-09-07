import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";

export default function CarEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ isSaved, setIsSaved ] = useState(false);
  return (
    <>
    </>
  );
}