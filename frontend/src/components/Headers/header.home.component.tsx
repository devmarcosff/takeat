"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { TiLocation } from "react-icons/ti";
import Logo from '../../../assets/logo_takeat.png'
import { FaStreetView } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import LoadingHeader from "../loading/loading.header.component";

export default function Header() {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
    address: {
      road?: string;
      town?: string;
      state?: string;
      postcode?: string;
      country?: string;
    };
  }>({
    latitude: null,
    longitude: null,
    address: {},
  });

  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem("clientAddress");
    if (savedAddress) {
      setLocation(JSON.parse(savedAddress));
      setIsSaved(true);
    }
  }, []);

  const fetchAddress = async (latitude: number, longitude: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();

    if (!data || !data.address) {
      throw new Error("Failed to fetch address");
    }

    return data.address; // Retorna o campo 'address' com os dados separados
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const address = await fetchAddress(latitude, longitude);
          setLocation({ latitude, longitude, address });
          setError(null);
        } catch {
          setError("Failed to fetch address");
        }
      }
    );
  };

  const handleEditAddress = () => {
    setIsEditing(true);
  };

  const handleAddressChange = (field: string, value: string) => {
    setLocation((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSaveEditedAddress = () => {
    localStorage.setItem("clientAddress", JSON.stringify(location));
    setIsEditing(false);
    setIsSaved(true);
    alert("Endereço atualizado com sucesso!");
  };

  if (error) <LoadingHeader />

  return (
    <div className="flex flex-col gap-3 p-3 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
      <div className="flex items-center gap-3">
        <Image src={Logo} height={64} width={64} className="h-16" alt="Takeat App" />
        <div>
          <h2 className="font-medium">Takeat app</h2>
          <span className="text-sm flex items-center gap-1">
            {!location.address.road ? (
              <button onClick={getLocation} className="flex gap-1 items-center"><TiLocation className="text-takeat-black-500" /> Obter Localização</button>
            ) : isEditing ? (
              <div className="flex flex-col">
                <input
                  className="border p-1 rounded"
                  type="text"
                  value={location.address.road || ""}
                  placeholder="Rua"
                  onChange={(e) => handleAddressChange("road", e.target.value)}
                />
                <input
                  className="border p-1 rounded"
                  type="text"
                  value={location.address.town || ""}
                  placeholder="Cidade"
                  onChange={(e) => handleAddressChange("town", e.target.value)}
                />
                <input
                  className="border p-1 rounded"
                  type="text"
                  value={location.address.state || ""}
                  placeholder="Estado"
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="flex gap-1 items-center"><FaStreetView className="text-takeat-black-500" /> {location.address.road}</p>
                <p className="flex gap-1 items-center"><TiLocation className="text-takeat-black-500" /> {location.address.town}</p>
                <p className="flex gap-1 items-center"><FaMapLocation className="text-takeat-black-500" /> {location.address.state}</p>
              </div>
            )}
          </span>
          <div className="flex gap-3 items-center justify-between">
            {location.address.road && !isSaved && <button className="bg-takeat-attention-50 border border-takeat-attention-500 px-5 py-1 w-full rounded-sm shadow-md text-sm" onClick={handleEditAddress}>Editar</button>}
            {location.address.road && !isSaved && <button className="bg-takeat-success-50 border border-takeat-success-500 px-5 py-1 w-full rounded-sm shadow-md text-sm" onClick={handleSaveEditedAddress}>Salvar</button>}
          </div>
        </div>
      </div>
      <hr className="text-takeat-black-500 border" />
      <div className="flex items-center mx-3 gap-2 divide-x divide-takeat-gray-500">
        <span className="flex items-center gap-2 text-xs font-light px-2"><div className="bg-takeat-success-500 rounded-full h-3 w-3 animate-pulse"></div> Aberto / Acessivel</span>
        <span className="flex items-center gap-2 text-xs font-light px-2"><div className="bg-takeat-error-500 rounded-full h-3 w-3 animate-pulse"></div> Fechado / Inacessível</span>
      </div>
    </div>
  )
}