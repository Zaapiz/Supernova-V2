import { reactive } from "vue";
import { actions } from "astro:actions";

export const items = reactive({
  selectedRoom: null as string | null,
  rooms: [] as { roomid: string; name: string }[],
  chats: [] as { ai: boolean; text: string }[],
});

export async function selectRoom(roomid: string | null) {
  if (roomid) {
    const response = await actions.aiActions.getChats({ roomid });
    items.chats = response.data;
    items.selectedRoom = roomid;
  } else {
    items.selectedRoom = null;
    items.chats = [];
  }
}
