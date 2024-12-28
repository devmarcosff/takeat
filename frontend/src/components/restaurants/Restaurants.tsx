import { IoRestaurant } from "react-icons/io5";

export default function Restaurants() {

  const restaurants = [
    {
      id: '0bb4fd09-b6f3-404f-9195-d7d33ecd6c18',
      url:'https://takeat-imgs.takeat.app/491e2dd42e4f7090d971fcf6d127079d.png',
      username: "Takeat",
      email: 'takeat@gmail.com',
      phone: '27999999999',
      address: 'R. Avaí, n 60',
      has_service_tax: false,
      canceledAt: null,
      inicio: '8:30',
      fim: '22:40',
      status: 0,
      createAt: '2024-12-27 16:48:28.603+00'
    },
    {
      id: '2dc36db0-733e-4daf-83d4-489784569f04',
      url:'https://takeat-imgs.takeat.app/491e2dd42e4f7090d971fcf6d127079d.png',
      username: "Marcos",
      email: 'dev1233@gmail.com',
      phone: '279999939997',
      address: 'R. Avaí, n 60',
      has_service_tax: true,
      canceledAt: null,
      inicio: '14:00',
      fim: '02:00',
      status: 1,
      createAt: '2024-12-27 20:35:13.281+00'
    },
    {
      id: '2dc36db0-733e-4daf-83d4-489784569f04',
      url:'https://takeat-imgs.takeat.app/491e2dd42e4f7090d971fcf6d127079d.png',
      username: "Marcos",
      email: 'dev1233@gmail.com',
      phone: '279999939997',
      address: 'R. Avaí, n 60',
      has_service_tax: true,
      canceledAt: null,
      inicio: '14:00',
      fim: '02:00',
      status: 1,
      createAt: '2024-12-27 20:35:13.281+00'
    },
    {
      id: '2dc36db0-733e-4daf-83d4-489784569f04',
      url:'https://takeat-imgs.takeat.app/491e2dd42e4f7090d971fcf6d127079d.png',
      username: "Marcos",
      email: 'dev1233@gmail.com',
      phone: '279999939997',
      address: 'R. Avaí, n 60',
      has_service_tax: true,
      canceledAt: null,
      inicio: '14:00',
      fim: '02:00',
      status: 1,
      createAt: '2024-12-27 20:35:13.281+00'
    },
    {
      id: '2dc36db0-733e-4daf-83d4-489784569f04',
      url:'https://takeat-imgs.takeat.app/491e2dd42e4f7090d971fcf6d127079d.png',
      username: "Marcos",
      email: 'dev1233@gmail.com',
      phone: '279999939997',
      address: 'R. Avaí, n 60',
      has_service_tax: true,
      canceledAt: null,
      inicio: '14:00',
      fim: '02:00',
      status: 1,
      createAt: '2024-12-27 20:35:13.281+00'
    },
    {
      id: '2dc36db0-733e-4daf-83d4-489784569f04',
      url:'https://takeat-imgs.takeat.app/491e2dd42e4f7090d971fcf6d127079d.png',
      username: "Marcos",
      email: 'dev1233@gmail.com',
      phone: '279999939997',
      address: 'R. Avaí, n 60',
      has_service_tax: true,
      canceledAt: null,
      inicio: '14:00',
      fim: '02:00',
      status: 1,
      createAt: '2024-12-27 20:35:13.281+00'
    },
    {
      id: '2dc36db0-733e-4daf-83d4-489784569f04',
      url:'https://takeat-imgs.takeat.app/491e2dd42e4f7090d971fcf6d127079d.png',
      username: "Marcos",
      email: 'dev1233@gmail.com',
      phone: '279999939997',
      address: 'R. Avaí, n 60',
      has_service_tax: true,
      canceledAt: null,
      inicio: '14:00',
      fim: '02:00',
      status: 1,
      createAt: '2024-12-27 20:35:13.281+00'
    },
  ]

  return (
    <div>
      <div className="m-2 p-3 bg-white rounded-md shadow-sm border border-takeat-gray-500 mb-16">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Restaurantes</h2>
          <IoRestaurant className="size-5 text-takeat-error-400" />
        </div>
        
        <div>
          {restaurants.map((item, index) => (
            <div className="transform-gpu mt-2 translate-x-0 translate-y-0 flex-shrink-0 flex-grow-0 w-[var(--slide-size)] min-w-0 pl-[var(--slide-spacing)]" key={index}>
              <div className="flex flex-col p-4 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
                <div className="flex items-center gap-3">
                  <img src={item.url} className="h-10" alt={item.username} />
                  <div className="flex items-start w-full justify-between">
                    <div>
                      <h2 className="font-medium">Takeat app</h2>
                      <p className="text-sm flex items-center gap-1">Lanches</p>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-xs font-light"><div className={`${item.status == 0 ? 'bg-takeat-error-500' : 'bg-takeat-success-500'} rounded-full h-3 w-3 animate-pulse`}></div> {item.status == 0 ? 'Fechado' : 'Aberto'}</span>
                      <span className="flex items-center gap-2 text-xs font-light mt-1">{item.inicio} as {item.fim}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}