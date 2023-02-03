import React from 'react';
import { IonSlides, IonSlide } from '@ionic/react';

export interface Photo {
    photos: Array<any>
}

const slideOpts = {
    initialSlide: 1,
    speed: 400
  };

const Carousel: React.FC<Photo> = ({ photos }) => {
    return (
            <IonSlides pager={true}>
                {
                    photos.map((photo,index) => (
                        
                        <IonSlide key={index}>
                            <img src={photo} alt={"slide "+index} key={"img"+index}/>
                        </IonSlide>
                    ))
                }
            </IonSlides>
    );
};

export default Carousel;
