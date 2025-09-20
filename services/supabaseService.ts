
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type FriendRequest = Database['public']['Tables']['friend_requests']['Row'];
type Friendship = Database['public']['Tables']['friendships']['Row'];
type Status = Database['public']['Tables']['statuses']['Row'];
type Chat = Database['public']['Tables']['chats']['Row'];
type Message = Database['public']['Tables']['messages']['Row'];

export class SupabaseService {
  // Profile operations
  static async getProfile(userId: string): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Exception fetching profile:', error);
      return null;
    }
  }

  static async updateProfile(userId: string, updates: Partial<Profile>) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userId);
      
      if (error) {
        console.error('Error updating profile:', error);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Exception updating profile:', error);
      return { error: { message: 'Network error' } };
    }
  }

  static async findUserByEmail(email: string): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        console.error('Error finding user by email:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Exception finding user by email:', error);
      return null;
    }
  }

  // Friend request operations
  static async sendFriendRequest(fromUserId: string, toUserId: string) {
    try {
      const { error } = await supabase
        .from('friend_requests')
        .insert({
          from_user_id: fromUserId,
          to_user_id: toUserId,
          status: 'pending'
        });
      
      if (error) {
        console.error('Error sending friend request:', error);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Exception sending friend request:', error);
      return { error: { message: 'Network error' } };
    }
  }

  static async getFriendRequests(userId: string): Promise<FriendRequest[]> {
    try {
      const { data, error } = await supabase
        .from('friend_requests')
        .select('*')
        .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
        .eq('status', 'pending');
      
      if (error) {
        console.error('Error fetching friend requests:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception fetching friend requests:', error);
      return [];
    }
  }

  static async acceptFriendRequest(requestId: string) {
    try {
      // First, get the friend request details
      const { data: request, error: fetchError } = await supabase
        .from('friend_requests')
        .select('*')
        .eq('id', requestId)
        .single();

      if (fetchError || !request) {
        console.error('Error fetching friend request:', fetchError);
        return { error: fetchError };
      }

      // Update the request status
      const { error: updateError } = await supabase
        .from('friend_requests')
        .update({ status: 'accepted' })
        .eq('id', requestId);

      if (updateError) {
        console.error('Error accepting friend request:', updateError);
        return { error: updateError };
      }

      // Create mutual friendship
      const { error: friendshipError } = await supabase.rpc('create_mutual_friendship', {
        user1_id: request.from_user_id,
        user2_id: request.to_user_id
      });

      if (friendshipError) {
        console.error('Error creating friendship:', friendshipError);
        return { error: friendshipError };
      }

      return { error: null };
    } catch (error) {
      console.error('Exception accepting friend request:', error);
      return { error: { message: 'Network error' } };
    }
  }

  static async declineFriendRequest(requestId: string) {
    try {
      const { error } = await supabase
        .from('friend_requests')
        .update({ status: 'declined' })
        .eq('id', requestId);
      
      if (error) {
        console.error('Error declining friend request:', error);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Exception declining friend request:', error);
      return { error: { message: 'Network error' } };
    }
  }

  // Friendship operations
  static async getFriends(userId: string): Promise<Profile[]> {
    try {
      const { data, error } = await supabase
        .from('friendships')
        .select(`
          friend_id,
          profiles!friendships_friend_id_fkey (*)
        `)
        .eq('user_id', userId);
      
      if (error) {
        console.error('Error fetching friends:', error);
        return [];
      }
      
      return data?.map(item => item.profiles).filter(Boolean) || [];
    } catch (error) {
      console.error('Exception fetching friends:', error);
      return [];
    }
  }

  // Status operations
  static async createStatus(userId: string, type: 'image' | 'text', content?: string, imageUrl?: string, caption?: string) {
    try {
      const { error } = await supabase
        .from('statuses')
        .insert({
          user_id: userId,
          type,
          content,
          image_url: imageUrl,
          caption
        });
      
      if (error) {
        console.error('Error creating status:', error);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Exception creating status:', error);
      return { error: { message: 'Network error' } };
    }
  }

  static async getStatuses(userId: string): Promise<Status[]> {
    try {
      const { data, error } = await supabase
        .from('statuses')
        .select('*')
        .or(`user_id.eq.${userId},user_id.in.(select friend_id from friendships where user_id = ${userId})`)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching statuses:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception fetching statuses:', error);
      return [];
    }
  }

  // Chat operations
  static async getChats(userId: string): Promise<Chat[]> {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .or(`participant_1.eq.${userId},participant_2.eq.${userId}`)
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching chats:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception fetching chats:', error);
      return [];
    }
  }

  static async createChat(participant1: string, participant2: string) {
    try {
      // Check if chat already exists
      const { data: existingChat } = await supabase
        .from('chats')
        .select('*')
        .or(`and(participant_1.eq.${participant1},participant_2.eq.${participant2}),and(participant_1.eq.${participant2},participant_2.eq.${participant1})`)
        .single();

      if (existingChat) {
        return { data: existingChat, error: null };
      }

      // Create new chat
      const { data, error } = await supabase
        .from('chats')
        .insert({
          participant_1: participant1,
          participant_2: participant2
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating chat:', error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Exception creating chat:', error);
      return { data: null, error: { message: 'Network error' } };
    }
  }

  // Message operations
  static async getMessages(chatId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception fetching messages:', error);
      return [];
    }
  }

  static async sendMessage(chatId: string, senderId: string, content: string, type: 'text' | 'image' | 'file' = 'text') {
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          chat_id: chatId,
          sender_id: senderId,
          content,
          type
        });
      
      if (error) {
        console.error('Error sending message:', error);
        return { error };
      }
      
      // Update chat's last message
      await supabase
        .from('chats')
        .update({
          last_message: content,
          last_message_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', chatId);
      
      return { error: null };
    } catch (error) {
      console.error('Exception sending message:', error);
      return { error: { message: 'Network error' } };
    }
  }
}
