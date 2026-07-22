# Git e GitHub

## Primeira publicação ou atualização

Na raiz do projeto:

```powershell
git status
git remote -v
git branch --show-current
```

Confirmar cuidadosamente que `.env`, `node_modules`, `.next` e logs não aparecem
na lista de ficheiros a enviar.

Depois:

```powershell
git add .
git status
git commit -m "chore: organiza repositorio e validacao"
git push origin main
```

Se o ramo principal se chamar `master`:

```powershell
git push origin master
```

## Pelo Visual Studio Code

1. Abrir **Source Control**.
2. Rever os ficheiros alterados.
3. Escrever a mensagem do commit.
4. Selecionar **Commit**.
5. Selecionar **Sync Changes** ou **Push**.

## Fluxo para alterações futuras

```powershell
git pull --rebase origin main
git switch -c feature/nome-da-alteracao
# alterar e testar
git add .
git commit -m "feat: descreve a alteracao"
git push -u origin feature/nome-da-alteracao
```

Depois abrir um Pull Request no GitHub.

## Ficheiros que nunca entram no repositório

- `.env` e backups;
- `node_modules/`;
- `.next/`;
- `atualizacao.log` e outros logs;
- uploads e documentos reais de clientes;
- chaves Stripe, Sage, Resend ou PostgreSQL.

## Credencial enviada por engano

Apagar o ficheiro num commit posterior não é suficiente, porque permanece no
histórico. A credencial deve ser imediatamente revogada e substituída. Depois,
o histórico pode ser limpo com uma ferramenta apropriada e o acesso ao
repositório deve ser revisto.

## Versões

Enquanto o projeto não estiver pronto para produção, usar versões `0.x`:

- `0.9.0`: versão funcional de desenvolvimento;
- `0.9.1`: correções compatíveis;
- `0.10.0`: novo conjunto funcional relevante;
- `1.0.0`: primeira versão validada para produção.

As alterações devem ser registadas no `CHANGELOG.md`.
