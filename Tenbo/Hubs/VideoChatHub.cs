using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Tenbo.Hubs
{
    public class VideoChatHub:Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}