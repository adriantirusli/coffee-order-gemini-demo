"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/utils/classNameMerger";
import { DUMMY_PRODUCTS } from "@/app/data";
import { parse } from "path";

interface Message {
  role: "user" | "assistant";
  content: string | { response: string };
}

interface OrderItem {
  id: string;
  item: string;
  size?: string;
  ice?: string;
  sweetness?: string;
  diary?: string;
  extras?: string[];
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your coffee assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(1).map((msg) => ({
            role: msg.role,
            content:
              typeof msg.content === "object"
                ? msg.content.response
                : msg.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const parsedContent = data.message.includes("response")
        ? JSON.parse(
            data.message.replace(/^```json\s*/, "").replace(/\s*```$/, "")
          )
        : data.message;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: parsedContent },
      ]);

      if (parsedContent.currentOrder?.length > 0) {
        parsedContent.currentOrder.forEach((item: OrderItem) => {
          const orderItem = {
            productId: Number(item.id),
            productName: item.item,
            basePrice:
              DUMMY_PRODUCTS.find((p) => p.id === Number(item.id))?.price || 0,
            quantity: 1,
            modifiers: {
              size: item.size || "Regular",
              ice: item.ice || "Regular",
              sweetness: item.sweetness || "Regular",
              diary: item.diary || "Milk",
              extras: item.extras || [],
            },
            modifiersCost: 0,
          };

          addItem(orderItem);
        });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 bg-black text-white rounded-full p-3 shadow-lg hover:bg-gray-800 transition-colors z-50"
      >
        <ChatBubbleLeftIcon className="h-6 w-6" />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={cn(
            "fixed bottom-0 right-0 w-full sm:w-96 h-[600px] bg-white rounded-t-xl transition-transform",
            isOpen ? "translate-y-0" : "translate-y-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold">Coffee Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 h-[calc(600px-8rem)]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[80%] mb-4 p-3 rounded-lg",
                  message.role === "user"
                    ? "ml-auto bg-black text-white rounded-br-none"
                    : "bg-gray-100 rounded-bl-none"
                )}
              >
                {typeof message.content === "object"
                  ? message.content.response
                  : message.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none max-w-[80%] animate-pulse">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
