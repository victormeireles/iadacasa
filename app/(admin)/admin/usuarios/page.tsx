import { getAllProfiles } from '@/lib/db/profiles'
import { getSessionUser } from '@/lib/auth/session'
import { UserRoleSelector } from '@/components/admin/UserRoleSelector'

export default async function AdminUsuariosPage() {
  const [currentUser, users] = await Promise.all([
    getSessionUser(),
    getAllProfiles(),
  ])

  const isSuperAdmin = currentUser?.role === 'super_admin'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#211E19] mb-1">Usuários e restaurantes</h1>
        <p className="text-[#6F6657]">
          {users.length} usuário{users.length !== 1 ? 's' : ''} cadastrado{users.length !== 1 ? 's' : ''}.
          Clique no perfil para promover ou rebaixar.
        </p>
      </div>

      {/* Role legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {[
          { role: 'client',      label: 'Cliente',     color: 'bg-[#DEEBE1] text-[#235139]',  desc: 'Acessa só a área do cliente' },
          { role: 'admin',       label: 'Admin',        color: 'bg-[#F9EFD6] text-[#A9761F]',  desc: 'Acessa o painel admin' },
          { role: 'super_admin', label: 'Super admin',  color: 'bg-[#EDD7DB] text-[#6E2A38]',  desc: 'Pode gerenciar admins' },
        ].map(r => (
          <div key={r.role} className="flex items-center gap-2 rounded-lg border border-[#E2D5C0] bg-[#FFFDF9] px-3 py-1.5">
            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${r.color}`}>{r.label}</span>
            <span className="text-[#6F6657]">{r.desc}</span>
          </div>
        ))}
      </div>

      {users.length === 0 ? (
        <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-12 text-center shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          <p className="text-[#6F6657]">Nenhum usuário cadastrado ainda.</p>
        </div>
      ) : (
        <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] overflow-hidden shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2D5C0] bg-[#F5EEE1]">
                <th className="text-left px-5 py-3 font-semibold text-[#443E35]">Usuário</th>
                <th className="text-left px-5 py-3 font-semibold text-[#443E35] hidden sm:table-cell">Restaurante</th>
                <th className="text-left px-5 py-3 font-semibold text-[#443E35] hidden md:table-cell">Segmento</th>
                <th className="text-left px-5 py-3 font-semibold text-[#443E35]">Perfil</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => {
                const isCurrentUser = user.user_id === currentUser?.id
                return (
                  <tr
                    key={user.id}
                    className={`hover:bg-[#FBF7F0] transition-colors ${idx < users.length - 1 ? 'border-b border-[#F5EEE1]' : ''}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#235139] text-white text-xs font-semibold">
                          {(user.name || user.email).slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[#211E19]">{user.name || '(sem nome)'}</p>
                            {isCurrentUser && (
                              <span className="text-[10px] text-[#968C7B] bg-[#F5EEE1] rounded px-1.5 py-0.5">você</span>
                            )}
                          </div>
                          <p className="text-xs text-[#968C7B]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell text-[#443E35]">
                      {user.restaurant_name ?? (
                        <span className="text-[#968C7B] italic text-xs">Não cadastrado</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-[#6F6657] capitalize">
                      {user.restaurant_segment ?? '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <UserRoleSelector
                        profileId={user.id}
                        currentRole={user.role as 'client' | 'admin' | 'super_admin'}
                        isSelf={isCurrentUser}
                        canSetSuperAdmin={isSuperAdmin}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="rounded-lg bg-[#F5EEE1] border border-[#E2D5C0] p-4 text-sm text-[#6F6657]">
        <p>
          <strong className="text-[#443E35]">Como funciona:</strong> novos cadastros são sempre
          criados como <strong>Cliente</strong> automaticamente. Somente admins podem promover
          outros usuários aqui. Seu próprio perfil não pode ser alterado nesta tela.
        </p>
      </div>
    </div>
  )
}
