import React, { useState } from ‘react’;
import { X, Plus, Clock, CheckSquare, Trash2 } from ‘lucide-react’;

export default function FollowUpModal({
isOpen,
onClose,
followUps,
vehicles,
onAdd,
onComplete,
onDelete
}) {
const [newFollowUp, setNewFollowUp] = useState({
customer: ‘’,
vehicle: ‘’,
type: ‘Test Drive Follow-up’,
dueDate: ‘’,
notes: ‘’,
phone: ‘’,
email: ‘’
});

if (!isOpen) return null;

const handleAdd = () => {
if (newFollowUp.customer && newFollowUp.dueDate) {
onAdd(newFollowUp);
setNewFollowUp({
customer: ‘’,
vehicle: ‘’,
type: ‘Test Drive Follow-up’,
dueDate: ‘’,
notes: ‘’,
phone
