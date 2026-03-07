import { useContext } from "react";
import { getSong, uploadSong ,deleteSong} from "../services/song.api";
import { SongContext } from "../song.contect";

export const useSong = () => {

  const context = useContext(SongContext)

  const { loading, setloading, songs, setSongs } = context


  // 🎵 get songs by mood
  const handleGetSong = async ({ mood }) => {

    setloading(true)

    try {

      const data = await getSong({ mood })

      // backend se array aa raha hai
      setSongs(data.song)

    } catch (err) {

      console.log(err)

    } finally {

      setloading(false)

    }
  }


  // 🎵 upload song
  const handleUploadSong = async ({ song, mood }) => {

    setloading(true)

    try {

      const data = await uploadSong({ song, mood })

      return data?.song

    } catch (err) {

      console.log(err)
      throw err

    } finally {

      setloading(false)

    }
  }

  const handleSongDelete  = async ({id}) =>{
    setloading(true)

    try{
const data = await deleteSong(id)

console.log(data)

    }catch(err){
      console.log(err)
   
    }finally{
      setloading(false)
    }
  }


  return {
    loading,
    songs,
    handleGetSong,
    handleUploadSong,
    handleSongDelete
  }

}