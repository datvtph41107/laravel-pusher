<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function send(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        // $request->validate([
        //     'message' => 'required|string|max:255',
        // ]);

        // Phát sóng sự kiện
        event(new MessageSent($request->message));

        // Trả về phản hồi JSON
        return response()->json(['status' => 'Message sent!', 'message' => $request->message]);
    }
}
