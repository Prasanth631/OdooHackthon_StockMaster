import React, { useState, useContext } from 'react';
import { User, Mail, Shield, Lock } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import Alert from '../common/Alert';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';

const UserProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Simulate API call
      updateUser({ ...user, ...formData });
      setAlert({ type: 'success', message: 'Profile updated!' });
      setEditing(false);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update profile' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match' });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setAlert({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    setSubmitting(true);
    try {
      await authService.changePassword(passwordData.currentPassword, passwordData.newPassword);
      setAlert({ type: 'success', message: 'Password changed successfully!' });
      setShowPasswordForm(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to change password' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">Manage your account settings</p>
      </div>

      {alert && <Alert variant={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Profile Information</h3>
            {!editing && <Button variant="outline" onClick={() => setEditing(true)}>Edit</Button>}
          </div>

          {editing ? (
            <form onSubmit={handleUpdateProfile}>
              <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <div className="flex justify-end gap-4 mt-4">
                <Button type="button" variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                <Button type="submit" loading={submitting}>Save Changes</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <User className="text-gray-400" size={20} />
                <div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium">{user?.name}</p></div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Mail className="text-gray-400" size={20} />
                <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{user?.email}</p></div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Shield className="text-gray-400" size={20} />
                <div><p className="text-sm text-gray-500">Role</p><p className="font-medium capitalize">{user?.role?.replace('_', ' ')}</p></div>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Security</h3>
          {showPasswordForm ? (
            <form onSubmit={handleChangePassword}>
              <Input label="Current Password" type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} required />
              <Input label="New Password" type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required />
              <Input label="Confirm Password" type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} required />
              <div className="flex gap-2 mt-4">
                <Button type="button" variant="secondary" onClick={() => setShowPasswordForm(false)} className="flex-1">Cancel</Button>
                <Button type="submit" loading={submitting} className="flex-1">Update</Button>
              </div>
            </form>
          ) : (
            <Button variant="outline" onClick={() => setShowPasswordForm(true)} className="w-full">
              <Lock size={18} /> Change Password
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;