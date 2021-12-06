import Thumbnail from '../Thumbnail/Thumbnail';

export const ThumnailGrid = ({movies}) => {
    return(
        <div className="d-flex flex-wrap ">
            {
               movies.map((movie) => (<Thumbnail name={movie.name} lang={movie.lang} year={movie.year} id={movie._id} key={movie._id} thumb_path={movie.thumb_path} />))
            }            
        </div>
    );
}