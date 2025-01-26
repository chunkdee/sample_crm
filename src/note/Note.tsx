import React, { useState } from 'react';
import { List, Card, Typography, Avatar, Space, message, Button } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Identifier, useCreate, useCreateController, useGetIdentity, useGetManyReference, useListContext, useListController } from 'ra-core';
import { Note, User } from '../datagenerator/types/crmTypes';
import TextArea from 'antd/es/input/TextArea';

const { Text } = Typography;

interface NoteComponentProps {
  resource: string;
  id: Identifier;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date(date));
};

const NoteCard: React.FC<NoteComponentProps> = ({ resource, id }) => {

  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data:userData,isPending:isLoadingCache} = useGetIdentity();

  const {data , isPending , error , refetch} = useGetManyReference<Note>('notes', {
    target: `${resource.substring(0, resource.length-1)}Id`,
    id: id,
    sort: { field: 'createdAt', order: 'DESC' }
  });

 const [create] = useCreate<Note>();
  
 const handleAddNote = async () => {
    if (!newNote.trim()) return;
    setIsSubmitting(true);
    try {
      await create('notes', { 
        data: {
          content: newNote,
          [resource.substring(0, resource.length-1) + 'Id']: id,
          user: userData as User,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      
     message.success('Note added successfully');
      setNewNote('');
      refetch();
    } catch (error) {
      message.error('Failed to add note');
      console.error('Error adding note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Card title="Notes"  style={{
  
      borderRadius: '8px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      marginBottom: '16px',
      
    }}>

<div style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
  <Avatar 
    src={userData?.avatar}
    icon={!userData?.avatar && <UserOutlined />}
    style={{ marginTop: '4px' }}
  />
  <TextArea
    rows={1}
    value={newNote}
    onChange={(e) => setNewNote(e.target.value)}
    onKeyDown={async (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!newNote.trim() || isSubmitting) return;
        await handleAddNote();
      }
    }}
    placeholder="Add a note..."
    style={{
      flex: 1,
      fontSize: '12px',
    }}
  />
</div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
      <List
        itemLayout="horizontal"
        dataSource={[...(data || [])].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )}
        renderItem={(note, index) => (
          <List.Item
            style={{
              display: 'flex',
              gap: '8px',
              padding: '12px',
              borderBottom: '1px solid #f0f0f0',
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
            }}
          >
            <div style={{ width: '100%' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '8px',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={note.user?.avatar}
                    icon={!note.user?.profileImage && <UserOutlined />}
                    style={{ marginRight: '8px' }}
                  />
                  <Text strong >
                    {note.user?.fullName}
                  </Text>
                </div>
                <Text type="secondary">
                  {formatDate(note.createdAt)}
                </Text>
              </div>
              
              <div style={{ 
                paddingLeft: '40px',
                fontSize: '14px',
                color: '#262626'
              }}>
                {note.content}
              </div>
            </div>
          </List.Item>
        )}
      />
      </div> 
    </Card>
  );
};

export default NoteCard;
