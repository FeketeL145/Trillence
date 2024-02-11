using System.IO;
namespace BackEnd
{
    public static class ImportTracks
    {
        static void Importingthingsforfrontend()
        {
            string temp;
            bool correctuser;
            do
            {
                int temp1 = 1;
                if (temp1 == 1)
                {
                    temp = "D:/programozas/ikt/BIGPROJECT2";
                    correctuser = true;
                }
                else
                {
                    temp = "error";
                    correctuser = false;
                }
            }
            while (!correctuser);
            string zenepath = temp + "/DownloadedSongs";
            string datapath = temp + "/FrontEnd/trillence/src/Components/MusicPlayer/data";

            FileStream sb = new FileStream(datapath + "/tracks.js", FileMode.OpenOrCreate);
            StreamWriter sw = new StreamWriter(sb);
            string[] zenefajlok = Directory.GetFiles(zenepath);

            for (int i = 0; i < zenefajlok.Length; i++)
            {
                string currentFile = zenefajlok[i];
                if (currentFile.EndsWith(".mp3") || currentFile.EndsWith(".m4a"))
                {
                    string currentFile2 = currentFile.Replace(@"\", "/");
                    string currentFile3 = currentFile2.Replace(@"mp3", "jpg");
                    sw.Write("import " + Path.GetFileNameWithoutExtension(currentFile2) + " from '" + currentFile2.TrimStart('\\') + "';\r\n");
                }

            }
            sw.Write("\r\n");
            for (int i = 0; i < zenefajlok.Length; i++)
            {
                string currentFile = zenefajlok[i];
                if (currentFile.EndsWith(".mp3") || currentFile.EndsWith(".m4a"))
                {
                    string currentFile3 = currentFile.Replace(@"\", "/");
                    currentFile3 = currentFile.Replace(@"mp3", "jpg");
                    sw.Write("import " + Path.GetFileNameWithoutExtension(currentFile3) + "Pics" + " from '" + currentFile3 + "';\r\n");
                }

            }
            sw.Write("\r\n");
            sw.Write($"export const tracks = [ \r\n");
            for (int i = 0; i < zenefajlok.Length; i++)
            {
                string currentFile = zenefajlok[i];
                string currentFile3 = Path.GetFileNameWithoutExtension(currentFile);
                if (currentFile.EndsWith(".mp3") || currentFile.EndsWith(".m4a"))
                {
                    sw.Write("\t { \r\n");
                    sw.Write(" \t \t title: " + Path.GetFileNameWithoutExtension(currentFile) + "\r\n");
                    sw.Write(" \t \t src: \r\n");
                    sw.Write(" \t \t author: \r\n");
                    sw.Write(" \t \t thumbnail: " + currentFile3 + "Pics" + "\r\n");
                    sw.WriteLine("\t }");
                }
            }
            sw.WriteLine("];");
            sw.Close();
        }
    }
}
