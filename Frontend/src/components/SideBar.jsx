import React from "react";

const SideBar = ({price,setPrice}) => {

  const priceRanges = [
    {id: 'all',label:'All Price',min: null,max: null},
    {id: '1',label:'$0 - $100',min: 0,max: 100},
    {id: '2',label:'$100 - $200',min: 100,max: 200},
    {id: '3',label:'$200 - $300',min: 200,max: 300},
    {id: '4',label:'$300 - $400',min: 300,max: 400},
    {id: '5',label:'$400 - $500',min: 400,max: 500},
  ]

  const handlePriceChange = (prices)=>{
    if (prices.id === 'all'){
      setPrice(null)
    }
    else {
      setPrice({
        min:prices.min,
        max:prices.max
      })
    }
  }

  return (
    <>
      <div class="col-lg-3 col-md-4 ">
        {/* <!-- Price Start --> */}
        <h5 class="section-title position-relative text-uppercase mb-3">
          <span class="bg-secondary pr-3">Filter by price</span>
        </h5>
        <div class="bg-light p-4 mb-30">
          <form>
            {priceRanges.map((range)=>(
              <div key={range.id} class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="radio"
                name="price-range"
                class="custom-control-input"
                onChange={()=>handlePriceChange(range)}
                checked={
                  (range.id === 'all' && price === null) || 
                  (price?.min === range.min && price?.max === range.max)
                }
                id={`price-${range.id}`}
              />
              <label class="custom-control-label" for={`price-${range.id}`}>
                {range.label}
              </label>
            </div>
            ))}
          </form>
        </div>
        {/* <!-- Price End --> */}

        {/* <!-- Color Start --> */}
        <h5 class="section-title position-relative text-uppercase mb-3">
          <span class="bg-secondary pr-3">Filter by color</span>
        </h5>
        <div class="bg-light p-4 mb-30">
          <form>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                class="custom-control-input"
                checked=""
                id="color-all"
              />
              <label class="custom-control-label" for="price-all">
                All Color
              </label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                class="custom-control-input"
                id="color-1"
              />
              <label class="custom-control-label" for="color-1">
                Black
              </label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                class="custom-control-input"
                id="color-2"
              />
              <label class="custom-control-label" for="color-2">
                White
              </label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                class="custom-control-input"
                id="color-3"
              />
              <label class="custom-control-label" for="color-3">
                Red
              </label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                class="custom-control-input"
                id="color-4"
              />
              <label class="custom-control-label" for="color-4">
                Blue
              </label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
              <input
                type="checkbox"
                class="custom-control-input"
                id="color-5"
              />
              <label class="custom-control-label" for="color-5">
                Green
              </label>
            </div>
          </form>
        </div>
        {/* <!-- Color End --> */}

        {/* <!-- Size Start --> */}
        <h5 class="section-title position-relative text-uppercase mb-3">
          <span class="bg-secondary pr-3">Filter by size</span>
        </h5>
        <div class="bg-light p-4 mb-30">
          <form>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                class="custom-control-input"
                checked=""
                id="size-all"
              />
              <label class="custom-control-label" for="size-all">
                All Size
              </label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input type="checkbox" class="custom-control-input" id="size-1" />
              <label class="custom-control-label" for="size-1">
                XS
              </label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input type="checkbox" class="custom-control-input" id="size-2" />
              <label class="custom-control-label" for="size-2">
                S
              </label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input type="checkbox" class="custom-control-input" id="size-3" />
              <label class="custom-control-label" for="size-3">
                M
              </label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input type="checkbox" class="custom-control-input" id="size-4" />
              <label class="custom-control-label" for="size-4">
                L
              </label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
              <input type="checkbox" class="custom-control-input" id="size-5" />
              <label class="custom-control-label" for="size-5">
                XL
              </label>
            </div>
          </form>
        </div>
        {/* <!-- Size End --> */}
      </div>
    </>
  );
};

export default SideBar;
