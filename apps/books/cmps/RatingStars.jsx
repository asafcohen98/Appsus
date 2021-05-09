export function RatingStars({rate, handleChange, isPreview}) {
  const starIcon = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
  function onHandleChange(ev) {
      if (!isPreview) handleChange(ev);
  }
      return (
          <div className="star-rate">
              <label className={rate >= 5 ? 'star-active' : ''} htmlFor="rate-5">{starIcon}</label>
              <input id="rate-5" name="rate" value={5} type="radio" onChange={onHandleChange} />
              <label className={rate >= 4 ? 'star-active' : ''} htmlFor="rate-4">{starIcon}</label>
              <input id="rate-4" name="rate" value={4} type="radio" onChange={onHandleChange} />
              <label className={rate >= 3 ? 'star-active' : ''} htmlFor="rate-3">{starIcon}</label>
              <input id="rate-3" name="rate" value={3} type="radio" onChange={onHandleChange} />
              <label className={rate >= 2 ? 'star-active' : ''} htmlFor="rate-2">{starIcon}</label>
              <input id="rate-2" name="rate" value={2} type="radio" onChange={onHandleChange} />
              <label className={rate >= 1 ? 'star-active' : ''} htmlFor="rate-1">{starIcon}</label>
              <input id="rate-1" name="rate" value={1} type="radio" onChange={onHandleChange} />
          </div>
      )
  // }
}
