import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  return (
    <section className={`max-w-3xl mx-auto [--slide-spacing:.5rem] ${slides.length == 1 ? '[--slide-size:98%]' : '[--slide-size:85%]'} ml-2 my-2`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex [touch-action:pan-y] ml-[calc(var(--slide-spacing)*-1)]">
          {slides.map((index) => (
            <div className="transform-gpu translate-x-0 translate-y-0 flex-shrink-0 flex-grow-0 w-[var(--slide-size)] min-w-0 pl-[var(--slide-spacing)]" key={index}>
              <div className="flex flex-col p-4 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
                <div className="flex items-center gap-3">
                  <img src="https://takeat-imgs.takeat.app/491e2dd42e4f7090d971fcf6d127079d.png" className="h-10" alt="Takeat App" />
                  <div className="flex items-start w-full justify-between">
                    <div>
                      <h2 className="font-medium">Takeat app</h2>
                      <p className="text-sm flex items-center gap-1">Lanches</p>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-xs font-light"><div className="bg-takeat-error-500 rounded-full h-3 w-3 animate-pulse"></div> Fechado</span>
                      <span className="flex items-center gap-2 text-xs font-light mt-1">08:00 as 17:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </section>
  )
}

export default EmblaCarousel