import React, { useEffect, useState } from 'react'


import { MdKeyboardArrowRight, MdLiveTv } from 'react-icons/md'
import Wrapper from '../../components/Wrapper/Wrapper';
import SocialList from '../../components/SocialList/SocialList';
import GridContainer from '../../components/GridContainer/GridContainer';
import tmdbApi, { TmdbMediaType } from '../../services/tmdbApi';
import { Movie, TV } from '../../Types/Movie';
import ListMovieHorizontal from '../../components/ListMovieHorizontal/ListMovieHorizontal';
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard';
import { useQuery } from '@tanstack/react-query';
import { AiFillPlayCircle } from 'react-icons/ai';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import VideoPopup from '../../components/VideoPopup/VideoPopup';
import { VideoResult } from '../../Types/Video';
import HeroSlide from '../../components/HeroSlide/HeroSlide';

type Props = {}

const Home = (props: Props) => {
    const [topRatingSelect, setTopRatingSelect] = useState<"movie" | "tv">("movie")
    const [popularSelect, setPopularSelect] = useState<"movie" | "tv">("movie")
    const [trailer, setTrailer] = useState<{ mediaType: TmdbMediaType, id: number }>()
    const [showPopup, setShowPopup] = useState<boolean>(false)


    const trendingQuery = useQuery({
        queryKey: ["trending"],
        queryFn: () => tmdbApi.getTrendingMovies()
    })


    const topRatedQuery = useQuery({
        queryKey: ["top_rated", topRatingSelect],
        queryFn: () => tmdbApi.getList<Movie | TV>(topRatingSelect, "top_rated"),
        keepPreviousData: true

    })

    const popularQuery = useQuery({
        queryKey: ["popular", popularSelect],
        queryFn: () => tmdbApi.getList<Movie | TV>(popularSelect, "popular"),
        keepPreviousData: true
    })

    const latestMovieQuery = useQuery({
        queryKey: ["latest_movie", { page: 1 }],
        queryFn: () => tmdbApi.getDiscoverList<Movie>("movie")
    })

    const latestTVQuery = useQuery({
        queryKey: ["latest_tv", { page: 1 }],
        queryFn: () => tmdbApi.getDiscoverList<TV>("tv")
    })


    const queryVideos = useQuery({
        queryKey: ["video", trailer],
        queryFn: () => tmdbApi.getVideo<VideoResult>(trailer?.mediaType, trailer?.id),
        enabled: trailer?.mediaType !== undefined && trailer.id !== undefined,
        keepPreviousData: false
    })

    const handleRequestClosePopup = () => {
        setShowPopup(false)
        setTrailer(undefined)
    }
    const handleClickTrailer = (media_type: TmdbMediaType, id: number) => {
        setTrailer({ mediaType: media_type, id })
        setShowPopup(true)
    }



    return (
        <div className='home'>
            {/* hero slide */}
            {/* <div className="hero-box">
                <Swiper
                    slidesPerView={1}
                    modules={[Pagination]}
                    pagination={true}
                    autoplay={
                        {
                            delay: 5000,
                            disableOnInteraction: false
                        }
                    }

                >
                    {
                        trendingQuery.data?.data.results.slice(0, 5).map(movie => {
                            let genres: Genres[] | undefined = []
                            if (movie.media_type === 'movie') {
                                genres = genresMovieQuery.data?.data.genres.filter(genre => movie.genre_ids.includes(genre.id))
                            }
                            else {
                                genres = genresTVQuery.data?.data.genres.filter(genre => movie.genre_ids.includes(genre.id))

                            }



                            return (
                                <SwiperSlide key={`${movie.id}-${movie.original_name}`}>
                                    <div className={`hero-slide`} style={{ backgroundImage: `url(${originalImage(movie.backdrop_path)})` }}>
                                        <Wrapper className='h-full relative z-10'>
                                            <div className="slide-content w-full md:w-[65%] pr-6 ">
                                                <div className="movie-name text-3xl md:text-4xl text-white font-bold  drop-shadow-lg pr-6">{movie.name || movie.title}</div>
                                                <div className="movie-info flex items-center gap-2 sm:gap-4 md:gap-6 mt-2">
                                                    <span className="quality px-3 py-0.5 flex items-center rounded bg-dark-teal font-medium text-white text-xl">{movie.media_type === "movie" ? <RiMovie2Fill /> : <MdLiveTv />}</span>
                                                    <span className="rating flex  gap-1 text-white text-sm">
                                                        <FaStar size={16} />{movie.vote_average.toFixed(1)}
                                                    </span>

                                                    <div className="cate">
                                                        {
                                                            genres?.map(item => {
                                                                return (
                                                                    <a href="#" key={item.id.toString()} className='cates inline-block mr-3 text-xs text-white/60 hover:text-white transition-colors duration-300 ease-out'>{item.name}</a>
                                                                )
                                                            })
                                                        }

                                                    </div>

                                                </div>
                                                <div className="movie-desc hidden  sm:block mt-4 text-white/50 font-thin text-sm">
                                                    {movie.overview}
                                                </div>
                                                <div className="buttons mt-8 flex gap-6">
                                                    <Link to={`${urlMap[movie.media_type]}${encodeURIComponent(movie.name?.toLowerCase()).replace(/%20/g, '-') || "na"}/${movie.id}`} className="watch-btn banner-btn  border-dark-teal text-dark-teal  hover:bg-dark-teal hover:text-white ">
                                                        <BsFillPlayFill size={20} /> Watch now
                                                    </Link>
                                                    <button onClick={() => { setShowPopup(true); setTrailer({ mediaType: movie.media_type, id: movie.id }) }} className="add-btn banner-btn  border-white/50 text-white/50 hover:bg-white hover:text-black"><BiMoviePlay size={16} /> Trailer
                                                    </button>
                                                </div>
                                            </div>
                                        </Wrapper>

                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </div> */}

            <HeroSlide onClickTrailer={handleClickTrailer} />

            <div className="main-content bg-black-2">
                {/* about info */}
                <section className="about py-3">
                    <Wrapper>
                        <h2 className='text-light-gray text-xl'>Watch Movies Online Free</h2>
                        <p className='text-light-gray text-xs sm:text-sm mt-2'>my app - Just a better place to watch movies online for free. It allows you to watch movies online in high quality for free. No registration is required. The content is updated daily with fast streaming servers, multi-language subtitles supported. Just open fmovies.to and watch your favorite movies, tv-shows. We have almost any movie, tv-shows you want to watch!</p>
                        <p className='text-light-gray mt-2 text-xs sm:text-sm'>Please help us by sharing this site with your friends. Thanks!</p>
                        <SocialList className='mt-2' />
                    </Wrapper>
                </section>



                <section >
                    <Wrapper>
                        <h2 className='text-light-gray py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>Top Trending </h2>
                        {
                            trendingQuery.data && <ListMovieHorizontal mediaType='all' className='pb-8 pt-6' data={trendingQuery.data?.data.results.slice(5)} />
                        }
                    </Wrapper>

                </section>

                <section >
                    <Wrapper>
                        <h2 className='text-light-gray flex py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>
                            <span>Top Rating</span>
                            <button onClick={() => setTopRatingSelect("movie")} className={classNames('flex ml-6 items-center justify-center text-xs gap-1 font-medium bg-blue-gray hover:bg-blue-gray-2 transition duration-300  p-2 rounded [&.active]:bg-dark-teal [&.active]:text-white ', { active: topRatingSelect === 'movie' })}><AiFillPlayCircle className='text-xl' /> Movies</button>
                            <button onClick={() => setTopRatingSelect("tv")} className={classNames('flex ml-2 items-center justify-center text-xs gap-1 font-medium bg-blue-gray hover:bg-blue-gray-2 transition duration-300  p-2 rounded [&.active]:bg-dark-teal [&.active]:text-white ', { active: topRatingSelect === 'tv' })}><MdLiveTv className='text-xl' /> <span className='mt-0.5'>TV-Series</span></button>
                        </h2>
                        {
                            topRatedQuery.data && <ListMovieHorizontal mediaType={topRatingSelect} className='pb-8 pt-6' data={(topRatedQuery.data.data.results as Movie[]) || (topRatedQuery.data.data.results as TV[]) || []} />
                        }
                    </Wrapper>

                </section>

                <section >
                    <Wrapper>
                        <h2 className='text-light-gray flex py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>
                            <span>Popular</span>
                            <button onClick={() => setPopularSelect("movie")} className={classNames('flex ml-6 items-center justify-center text-xs gap-1 font-medium bg-blue-gray hover:bg-blue-gray-2 transition duration-300  p-2 rounded [&.active]:bg-dark-teal [&.active]:text-white ', { active: popularSelect === 'movie' })}><AiFillPlayCircle className='text-xl' /> Movies</button>
                            <button onClick={() => setPopularSelect("tv")} className={classNames('flex ml-2 items-center justify-center text-xs gap-1 font-medium bg-blue-gray hover:bg-blue-gray-2 transition duration-300  p-2 rounded [&.active]:bg-dark-teal [&.active]:text-white ', { active: popularSelect === 'tv' })}><MdLiveTv className='text-xl' /> <span className='mt-0.5'>TV-Series</span></button>
                        </h2>
                        {
                            popularQuery.data && <ListMovieHorizontal mediaType={popularSelect} className='pb-8 pt-6' data={(popularQuery.data.data.results as Movie[]) || (popularQuery.data.data.results as TV[]) || []} />
                        }
                    </Wrapper>

                </section>


                <section className='top-rated py-6 bg-black-2'>
                    <Wrapper>
                        <h2 className='text-light-gray flex py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>
                            <span>Movies</span>
                            <Link to={"/movies"} className='flex ml-auto items-center text-sm text-dark-teal transition-opacity duration-300 hover:opacity-75'>View all <span className='text-base bg-dark-teal rounded-full text-black ml-2'><MdKeyboardArrowRight /></span></Link>
                        </h2>

                        <GridContainer className='lg:gap-x-3 gap-y-6 gap-x-2'>
                            {
                                latestMovieQuery.data && latestMovieQuery.data.data.results.map((movie, index) => {
                                    return (
                                        <HorizontalCard key={movie.id + `-${Math.random().toString()}`} mediaType='movie' data={movie} />
                                    )
                                })
                            }
                        </GridContainer>
                    </Wrapper>
                </section>

                <section className='top-rated py-6 bg-black-2'>
                    <Wrapper>
                        <h2 className='text-light-gray flex py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>
                            <span>TV-Series</span>
                            <Link to={"/tv-series"} className='flex ml-auto items-center text-sm text-dark-teal transition-opacity duration-300 hover:opacity-75'>View all <span className='text-base bg-dark-teal rounded-full text-black ml-2'><MdKeyboardArrowRight /></span></Link>
                        </h2>

                        <GridContainer className='lg:gap-x-3 gap-y-6 gap-x-2'>
                            {
                                latestTVQuery.data && latestTVQuery.data.data.results.map((tv, index) => {
                                    if (!tv.poster_path) return
                                    return (
                                        <HorizontalCard key={tv.id + `-${Math.random().toString()}`} mediaType='tv' data={tv} />
                                    )
                                })
                            }
                        </GridContainer>
                    </Wrapper>
                </section>


            </div>

            <VideoPopup requestClosePopup={handleRequestClosePopup} show={showPopup} embed={`https://www.youtube.com/embed/${queryVideos.data?.data.results[0].key || ""}`} />
        </div>
    )
}

export default Home