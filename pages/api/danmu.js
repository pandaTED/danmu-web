import { pusher } from '../../utils/pusher';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;
    if (!text || text.length > 140) {
      return res.status(400).json({ error: '弹幕内容不合法' });
    }
    await pusher.trigger('danmu-channel', 'new-danmu', { text, time: Date.now() });
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
} 