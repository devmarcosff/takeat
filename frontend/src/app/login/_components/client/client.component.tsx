import Header from "../../../../components/Headers/header.home.component"
import { OrderProps } from "../../../../types/Types"
import moment from "moment"
import { ClientLoginProps } from "./client.types"

export default function ClientLogin({ userClient, orders, orderRestaurant }: ClientLoginProps) {
  if (!userClient) return null

  return (
    <div className="pb-16">
      <div className={`mb-4 p-4 divide-y flex flex-col gap-3 border border-takeat-error-400/30 rounded bg-white`}>
        <div className="flex items-center gap-3 justify-between">
          <Header username={userClient?.username} phone={userClient?.phone} />
        </div>

        {
          userClient?.username && (
            <div>
              <div className="flex items-center justify-between gap-3 font-medium pt-2">
                <span className={`text-sm flex items-center gap-1`}>
                  Contatos: {userClient?.phone}
                </span>
              </div>
            </div>
          )
        }
      </div>

      <div className={`mb-4 p-4 divide-y flex flex-col gap-3 border border-takeat-error-400/30 rounded bg-white`}>
        <div className="flex items-center justify-between gap-3 font-medium">
          <span className={`text-sm flex items-center gap-1`}>Meus pedidos</span>
        </div>
        <div>
          {
            orders ?
              orders
                ?.sort((a: OrderProps, b: OrderProps) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((item: OrderProps, index: number) => {
                  return (
                    <div key={index}>
                      <div className="mb-4 p-4 border border-takeat-error-400/30 rounded bg-gray-50">
                        <h2 className="text-lg font-medium mb-2">{orderRestaurant?.username ? orderRestaurant.username : 'Não definido'}</h2>
                        <div className="flex justify-between text-sm">
                          <span>Pedido feito em {moment(item.createdAt).format("DD/MM/YYYY - HH:mm")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Quantidade de pedidos:</span>
                          <span>{item.amount}</span>
                        </div>
                        {
                          orderRestaurant?.has_service_tax && (
                            <div className="flex justify-between text-sm">
                              <span>Taxa do restaurante:</span>
                              <span>R$ {Number(item.total_service_price - item.total_price).toFixed(2)}</span>
                            </div>
                          )
                        }
                        <div className="flex justify-between text-sm">
                          <span>Total:</span>
                          <span>R$ {item.total_service_price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                }) : 'Nenhum pedido encontrado'
          }
        </div>
      </div>
    </div>
  )
}