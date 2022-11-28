import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function getHotels() {
  return prisma.hotel.findMany();
}

async function getHotelRooms(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    }
  });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">

const hotelRepository = {
  getHotels,
  getHotelRooms,
};

export default hotelRepository;
