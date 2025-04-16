import { Menu } from '@headlessui/react';
import { FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../app/Auth/useAuth';

export function UserDropdown() {
  const { user, logout } = useAuth();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
          {user?.name?.charAt(0).toUpperCase() ?? 'U'}
        </div>
        <FiChevronDown className="h-4 w-4 text-gray-400" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/profile"
              className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
            >
              <FiUser className="inline mr-2" />
              Meu Perfil
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={logout}
              className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2 text-sm text-gray-700`}
            >
              <FiLogOut className="inline mr-2" />
              Sair
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}