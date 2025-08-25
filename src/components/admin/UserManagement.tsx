"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useUsers, useUserMutations } from "@/hooks/useUsers";
import { useDebounce } from "@/hooks/useApi";
import { SiteUser } from "@/lib/api";

export default function UserManagement() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<SiteUser | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "subscriber" as "admin" | "editor" | "author" | "subscriber",
    status: "active" as "active" | "inactive" | "pending" | "suspended",
    department: "",
    phone: "",
    bio: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: users, loading, error, updateParams, refetch } = useUsers();
  const mutations = useUserMutations();

  // Filter users locally to avoid API loop issues
  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      // Filter by role
      if (
        filter !== "all" &&
        ["admin", "editor", "author", "subscriber"].includes(filter)
      ) {
        if (user.role !== filter) return false;
      }

      // Filter by status
      if (
        filter !== "all" &&
        ["active", "inactive", "pending", "suspended"].includes(filter)
      ) {
        if (user.status !== filter) return false;
      }

      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [users, filter, debouncedSearch]);

  // Initialize users hook with initial params only
  const initialParams = useMemo(
    () => ({
      page: 1,
      per_page: 15,
    }),
    []
  );

  const roles = {
    admin: "Administrateur",
    editor: "Éditeur",
    author: "Auteur",
    subscriber: "Abonné",
  };

  const statusLabels = {
    active: "Actif",
    inactive: "Inactif",
    pending: "En attente",
    suspended: "Suspendu",
  };

  const handleDeleteUser = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await mutations.deleteUser(id, {
          onSuccess: () => {
            refetch();
            setSelectedUsers((prev) => prev.filter((userId) => userId !== id));
            setSuccessMessage("Utilisateur supprimé avec succès");
            setTimeout(() => setSuccessMessage(""), 3000);
          },
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Erreur lors de la suppression de l'utilisateur");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    if (
      confirm(
        `Êtes-vous sûr de vouloir supprimer ${selectedUsers.length} utilisateur(s) ?`
      )
    ) {
      try {
        await Promise.all(selectedUsers.map((id) => mutations.deleteUser(id)));
        refetch();
        setSelectedUsers([]);
        setSuccessMessage(
          `${selectedUsers.length} utilisateur(s) supprimé(s) avec succès`
        );
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error bulk deleting users:", error);
        alert("Erreur lors de la suppression en masse");
      }
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await mutations.updateUserStatus(id, newStatus, {
        onSuccess: () => {
          refetch();
          setSuccessMessage("Statut mis à jour avec succès");
          setTimeout(() => setSuccessMessage(""), 3000);
        },
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      await mutations.updateUserRole(id, newRole, {
        onSuccess: () => {
          refetch();
          setSuccessMessage("Rôle mis à jour avec succès");
          setTimeout(() => setSuccessMessage(""), 3000);
        },
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Erreur lors de la mise à jour du rôle");
    }
  };

  const handleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === displayUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(displayUsers.map((user) => user.id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "subscriber",
      status: "active",
      department: "",
      phone: "",
      bio: "",
    });
    setFormErrors({});
  };

  const openCreateModal = () => {
    resetForm();
    setEditingUser(null);
    setShowUserModal(true);
  };

  const openEditModal = (user: SiteUser) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
      department: user.department || "",
      phone: user.phone || "",
      bio: user.bio || "",
    });
    setFormErrors({});
    setEditingUser(user);
    setShowUserModal(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Format d'email invalide";
    }

    if (!editingUser && !formData.password.trim()) {
      errors.password = "Le mot de passe est requis pour un nouvel utilisateur";
    }

    if (formData.password && formData.password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        department: formData.department || undefined,
        phone: formData.phone || undefined,
        bio: formData.bio || undefined,
        ...(formData.password && { password: formData.password }),
      };

      if (editingUser) {
        await mutations.updateUser(editingUser.id, userData, {
          onSuccess: () => {
            refetch();
            setShowUserModal(false);
            resetForm();
            setSuccessMessage("Utilisateur modifié avec succès");
            setTimeout(() => setSuccessMessage(""), 3000);
          },
        });
      } else {
        await mutations.createUser(userData, {
          onSuccess: () => {
            refetch();
            setShowUserModal(false);
            resetForm();
            setSuccessMessage("Utilisateur créé avec succès");
            setTimeout(() => setSuccessMessage(""), 3000);
          },
        });
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Erreur lors de la sauvegarde de l'utilisateur");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          statusClasses[status as keyof typeof statusClasses]
        }`}
      >
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleClasses = {
      admin: "bg-purple-100 text-purple-800",
      editor: "bg-blue-100 text-blue-800",
      author: "bg-green-100 text-green-800",
      subscriber: "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          roleClasses[role as keyof typeof roleClasses]
        }`}
      >
        {roles[role as keyof typeof roles]}
      </span>
    );
  };

  const totalUsers = users?.length || 0;
  const activeUsers = users?.filter((u) => u.status === "active").length || 0;
  const pendingUsers = users?.filter((u) => u.status === "pending").length || 0;
  const adminUsers = users?.filter((u) => u.role === "admin").length || 0;

  const displayUsers = filteredUsers;

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {successMessage}
        </div>
      )}
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des Utilisateurs
          </h1>
          <p className="text-gray-600">
            Gérez les comptes utilisateurs et leurs permissions
          </p>
        </div>
        <div className="flex space-x-3">
          {selectedUsers.length > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={mutations.loading}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {mutations.loading
                ? "Suppression..."
                : `Supprimer (${selectedUsers.length})`}
            </button>
          )}
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nouvel Utilisateur
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les utilisateurs</option>
            <optgroup label="Par rôle">
              {Object.entries(roles).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Par statut">
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
              <option value="pending">En attente</option>
              <option value="suspended">Suspendus</option>
            </optgroup>
          </select>
        </div>

        {displayUsers && displayUsers.length > 0 && (
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedUsers.length === displayUsers.length}
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Sélectionner tout ({displayUsers.length})
              </span>
            </label>
            {selectedUsers.length > 0 && (
              <span className="text-sm text-gray-600">
                {selectedUsers.length} utilisateur(s) sélectionné(s)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👥</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              <p className="text-gray-600">Total Utilisateurs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">✅</div>
            <div>
              <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
              <p className="text-gray-600">Actifs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⏳</div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {pendingUsers}
              </p>
              <p className="text-gray-600">En attente</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👑</div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{adminUsers}</p>
              <p className="text-gray-600">Administrateurs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle & Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière connexion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Chargement des utilisateurs...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-red-500"
                  >
                    Erreur: {error}
                  </td>
                </tr>
              ) : displayUsers && displayUsers.length > 0 ? (
                displayUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-4"
                        />
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full mr-4 bg-gray-300 flex items-center justify-center overflow-hidden">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <span className="text-gray-600 text-sm font-medium">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                            <div className="text-xs text-gray-400">
                              {user.phone || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.department || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>👆 {user.login_count} connexions</div>
                      <div>📝 {user.articles_count} articles</div>
                      <div>💬 {user.comments_count} commentaires</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.last_login || "Jamais"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col space-y-1">
                        <div className="space-x-2">
                          <button
                            onClick={() => openEditModal(user)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Modifier
                          </button>
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user.id, e.target.value)
                            }
                            disabled={mutations.loading}
                            className="text-xs border border-gray-300 rounded px-1 py-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {Object.entries(roles).map(([key, label]) => (
                              <option key={key} value={key}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-x-2">
                          <select
                            value={user.status}
                            onChange={(e) =>
                              handleStatusChange(user.id, e.target.value)
                            }
                            disabled={mutations.loading}
                            className="text-xs border border-gray-300 rounded px-1 py-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {Object.entries(statusLabels).map(
                              ([key, label]) => (
                                <option key={key} value={key}>
                                  {label}
                                </option>
                              )
                            )}
                          </select>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={mutations.loading}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && !error && displayUsers && displayUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Aucun utilisateur trouvé</div>
          <p className="text-gray-400 mt-2">
            {searchTerm
              ? "Essayez un autre terme de recherche"
              : "Commencez par créer votre premier utilisateur"}
          </p>
        </div>
      )}

      {/* User Creation/Edit Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-screen overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingUser
                    ? "Modifier l'utilisateur"
                    : "Nouvel utilisateur"}
                </h3>
              </div>

              <div className="px-6 py-4 space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Entrez le nom complet"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="utilisateur@infonet.bi"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe{" "}
                    {editingUser ? "(laisser vide pour ne pas changer)" : "*"}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Entrez le mot de passe"
                  />
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                {/* Role and Status Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Role Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rôle
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="admin">Administrateur</option>
                      <option value="editor">Éditeur</option>
                      <option value="author">Auteur</option>
                      <option value="subscriber">Abonné</option>
                    </select>
                  </div>

                  {/* Status Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="pending">En attente</option>
                      <option value="suspended">Suspendu</option>
                    </select>
                  </div>
                </div>

                {/* Department and Phone Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Department Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Département
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Administration, Editorial"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+257 22 123 456"
                    />
                  </div>
                </div>

                {/* Bio Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biographie
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description courte de l'utilisateur..."
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={mutations.loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {mutations.loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sauvegarde...
                    </span>
                  ) : editingUser ? (
                    "Mettre à jour"
                  ) : (
                    "Créer"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
