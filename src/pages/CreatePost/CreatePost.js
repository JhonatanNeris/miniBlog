import React from 'react'

//Import do CSS
import styles from './CreatePost.module.css';

//Import de hooks
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  //Obter usuário
  const {user} = useAuthValue()

  //Desestruturando hook para obter as funções de insertDcoument e reponse 
  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    //validate image URL
    try {
      new URL(image);     
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")      
    }

    console.log(formError)

    //criar array de tags
    //O split separa os elementos pela vírgula e cria um array
    //trim vai remover os espaços em branco 
    //toLowerCase vai colocar todas as letras em minúsculo 
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    
    //checar todos os valores
    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos.")
    }
    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    //reditect to home page
    navigate("/");
  }

  return (
    <div className={styles.createPost}>
        <h2>Criar post</h2>
        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input 
              type="text" 
              name="title" 
              required 
              placeholder='Pense em um bom titulo'
              onChange={(e) => setTitle(e.target.value)} 
              value={title}
            />
          </label>
          <label>
            <span>URL da imagem:</span>
            <input 
              type="text" 
              name="image" 
              required 
              placeholder='Insira uma imagem que represente o seu post'
              onChange={(e) => setImage(e.target.value)} 
              value={image}
            />
          </label>
          <label>
            <span>Conteúdo:</span>
            <textarea 
              name="body"
              required 
              placeholder='Insira o conteúdo do post'
              onChange={(e) => setBody(e.target.value)} 
              value={body}
            ></textarea>
          </label>
          <label>
            <span>Tags:</span>
            <input 
              type="text" 
              name="tags" 
              required 
              placeholder='Insira as tags separadas por vírgula'
              onChange={(e) => setTags(e.target.value)} 
              value={tags}
            />
          </label>
          
          {!response.loading && <button className='btn'>Criar post</button>}
          {response.loading && <button className='btn' disabled >Aguarde...</button>}
          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>}      
              
              
         
          
        </form>
    </div>
  )
}

export default CreatePost