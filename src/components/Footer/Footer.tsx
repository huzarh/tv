import React from 'react'
import Wrapper from '../Wrapper/Wrapper'
import SocialList from '../SocialList/SocialList'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='footer text-center bg-black pt-8 '>
      <Wrapper>
        <a href='#' className="logo text-3xl font-semibold text-white">
          Logos
        </a>
        <SocialList className='my-4 justify-center' />
        <h2 className='text-white font-medium my-4 text-xl text-center'>Watch Movies Online Free</h2>
        <p className='text-[#495057] text-xs sm:text-sm mt-2 md:px-40'>my app - Just a better place to watch movies online for free. It allows you to watch movies online in high quality for free. No registration is required. The content is updated daily with fast streaming servers, multi-language subtitles supported. Just open fmovies.to and watch your favorite movies, tv-shows. We have almost any movie, tv-shows you want to watch!</p>
      </Wrapper>
      <div className='text-[#495057] py-3 text-xs border-t border-t-[#495057] mt-4'>&copy;Copyright 2023. All rights reserved.</div>
    </div>
  )
}

export default Footer