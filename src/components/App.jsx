import { useState, useEffect } from "react";
import { GlobalStyle } from './GlobalStyle';
import { toast, ToastContainer } from 'react-toastify';
import { updateFetch } from "services/Fetch";
import Loader from "components/Loader";
import Button from "components/Button";
import Modal from "components/Modal";
import ImageGallery from "./ImageGallery";
import Searchbar from "./Searchbar";
import css from './App.module.css'

export function App() {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setiIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState([]);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setiIsLoading(true)
    updateFetch(imageName, page)
      .then(response => {
        setImages(prevImages => [...prevImages,...response.data.hits]);
      })
      .catch(error => setError(error.message))
      .finally(setiIsLoading(false));
    

  }, [imageName, page])
  
  const  onLoadMore = () => {
    setPage(prevPage => prevPage + 1 );
  };

  const handleSubmitForm = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const dataModal = (tags, largeImageURL) => {
    setCurrentImage({ tags, largeImageURL })
  };
  const shouldRenderButtonLoadMore = images.length > 0 && !isLoading
  return (

    <div className={css.App}>
      {error && toast('Error, wrong http request')}
        <Searchbar onSubmit={handleSubmitForm} />
        {isLoading && <Loader />}
        
        {shouldRenderButtonLoadMore &&
          <>
          <ImageGallery
            toggleModal={toggleModal}
            images={images} dataModal={dataModal}
          />
            <Button onCkick={onLoadMore} />
          </>
        }
        {showModal &&
          <Modal onClose={toggleModal}>
            <img
              src={currentImage.largeImageURL}
              alt={currentImage.tags}
            />
          </Modal>
        }
        <GlobalStyle />
        <ToastContainer autoClose={2700} />
      </div>
      
    );
}
