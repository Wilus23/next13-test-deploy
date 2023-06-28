import React from 'react'
import Image from 'next/image'
export default function heroComponent() {
  return (
    <div className="hero container max-w-screen-lg mx-auto pb-10">
      <h1 className="text-7xl text-center mt-40">This is a page about Will</h1>
      <Image src={somePick} width={500} height={500} alt="Picture" className="mx-auto mt-40" placeholder="blur" loading="lazy" />
      <p className="mt-20 mb-20">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis urna sit amet libero convallis mattis. Vestibulum iaculis posuere vehicula. Proin congue eleifend sem ac dapibus. Nunc efficitur, tortor eget bibendum malesuada, nulla nibh malesuada quam, et facilisis nunc leo placerat eros. Maecenas vitae facilisis dolor. Curabitur congue varius mi, ut cursus neque posuere vitae. Nam iaculis venenatis risus quis tincidunt. Suspendisse venenatis gravida quam et facilisis. Suspendisse tempor orci in tortor molestie semper.
          Sed eget turpis vitae nisl fermentum pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis enim sit amet augue volutpat condimentum non et nulla. Quisque feugiat, lectus sit amet viverra pharetra, augue velit sollicitudin dui, et placerat neque enim sed diam. Morbi id nibh vitae ipsum semper commodo sit amet id mi. Vivamus luctus, dolor vitae sagittis feugiat, tellus arcu varius ex, ac finibus nisi quam at dolor. Morbi sed malesuada nibh.
          Sed ornare accumsan libero, nec consectetur nisl maximus quis. Cras interdum massa quis neque volutpat vehicula. Aenean ac fringilla enim, ut rutrum lectus. Proin nec erat feugiat, dapibus nibh sit amet, accumsan justo. In elementum tellus at sem finibus, vel consequat purus pulvinar. Cras eu vehicula diam, sed scelerisque lacus. Sed ultricies porta lectus, in ultrices augue congue bibendum. Nulla eget egestas tortor.
          Morbi efficitur tortor nulla, vel gravida velit ultrices non. Suspendisse potenti. Fusce non velit ut dolor convallis ultrices eu ac massa. Sed ut tincidunt lorem, vitae aliquet nunc. Curabitur iaculis et arcu quis aliquam. Phasellus aliquet ipsum in nibh elementum, in tincidunt arcu posuere. Sed vitae porttitor orci
          Nam purus quam, tincidunt in aliquet ut, semper vitae tellus. Sed et posuere nibh. Sed et volutpat risus, quis tristique diam. Nam neque tellus, ullamcorper et turpis ac, vehicula aliquet nisl. Sed vitae urna imperdiet turpis consectetur fringilla in sed dui. Fusce eu odio consectetur, ultricies metus nec, fringilla nunc. Nulla non sodales eros. Integer congue urna vel elit eleifend, at bibendum metus condimentum. Vivamus pharetra finibus diam, vitae commodo purus dictum ac.</p>
    </div>
  )
}
